import cookieParser from 'cookie-parser'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config({
  path : './config/config.env'
})



// routes
import UserRoute from './routes/user.js'
import BlogRoute from './routes/blog.js'
import CommentRoute from './routes/comment.js'
import LikeRoute from './routes/like.js'
import { ErrorMiddleware } from './middlewares/ErrorMiddleware.js'




export const app = express()
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(ErrorMiddleware)
app.use('/api/v1/user',UserRoute)
app.use('/api/v1/blog',BlogRoute)
app.use("/api/v1/comment",CommentRoute)
app.use("/api/v1/like",LikeRoute)

app.get("/",(req,res) => {
    res.status(200).json({success:true,message:'welcome to blogger'})
})

