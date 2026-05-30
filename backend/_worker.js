import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import adminRouter from './routes/adminRoute.js'

const app = express()

app.use(express.json())
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL,
    'http://localhost:5173',
    'http://localhost:5174',
  ].filter(Boolean)
}))

app.use('/api/user',   userRouter)
app.use('/api/admin',  adminRouter)
app.use('/api/doctor', doctorRouter)

app.get('/', (_req, res) => res.send('DockRx API Working'))

let started = false

export default {
  async fetch(request, env, ctx) {
    // Copy Cloudflare secrets into process.env
    for (const [key, value] of Object.entries(env)) {
      process.env[key] = value
    }

    // Connect to MongoDB once
    if (!started) {
      await connectDB()
      connectCloudinary()
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
