import 'dotenv/config'
import express from "express"
import cors from 'cors'
import connectDB from "./config/mongodb.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import imageRouter from "./routes/imageRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)
app.use("/api/images", imageRouter)

app.get("/", (req, res) => {
  res.send("DockRx API Working")
});

app.listen(port, () => console.log(`DockRx Server started on PORT:${port}`))
