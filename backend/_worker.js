import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import adminRouter from './routes/adminRoute.js'
import imageRouter from './routes/imageRoute.js'

const app = express()

app.use(express.json())
app.use(cors({
  origin(origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      process.env.ADMIN_URL,
      'http://localhost:5173',
      'http://localhost:5174',
    ].filter(Boolean)

    callback(null, !origin || allowedOrigins.includes(origin))
  }
}))

// Middleware to attach Cloudflare env bindings (KV, etc.) to every request
app.use((req, _res, next) => {
  if (globalThis.__cfEnv) {
    req.cfEnv = globalThis.__cfEnv
  }
  next()
})

app.use('/api/user',   userRouter)
app.use('/api/admin',  adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/images', imageRouter)

app.get('/', (_req, res) => res.send('DockRx API Working'))

let started = false

export default {
  async fetch(request, env, ctx) {
    // Store complex Cloudflare bindings (KV, etc.) globally
    // so Express middleware can access them via req.cfEnv
    globalThis.__cfEnv = env

    // Copy string-valued secrets into process.env
    for (const [key, value] of Object.entries(env)) {
      if (typeof value === 'string') {
        process.env[key] = value
      }
    }

    // Connect to MongoDB once
    if (!started) {
      await connectDB()
      started = true
    }

    // Adapter: Cloudflare Request → Express → Cloudflare Response
    return new Promise((resolve, reject) => {
      const url = new URL(request.url)
      const chunks = []
      
      const mockReq = {
        method: request.method,
        url: url.pathname + url.search,
        headers: Object.fromEntries(request.headers.entries()),
        on(e, cb) {
          if (e === 'data') chunks.forEach(c => cb(c))
          if (e === 'end')  cb()
          return this
        },
      }

      const resHeaders = {}
      const resChunks  = []
      let   resStatus  = 200

      const mockRes = {
        statusCode: 200,
        setHeader(k, v)  { resHeaders[k] = v },
        getHeader(k)     { return resHeaders[k] },
        removeHeader(k)  { delete resHeaders[k] },
        writeHead(s, h)  { resStatus = s; if (h) Object.assign(resHeaders, h) },
        write(c)         { resChunks.push(typeof c === 'string' ? Buffer.from(c) : c) },
        end(c) {
          if (c) resChunks.push(typeof c === 'string' ? Buffer.from(c) : c)
          resolve(new Response(Buffer.concat(resChunks), {
            status: resStatus,
            headers: resHeaders,
          }))
        },
      }

      request.arrayBuffer().then(buf => {
        if (buf.byteLength > 0) chunks.push(Buffer.from(buf))
        app(mockReq, mockRes)
      }).catch(reject)
    })
  }
}
