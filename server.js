import {app} from './app.js'
import { dbConnect } from './config/dbConnect.js'
import {Server} from 'socket.io'
import cloudinary from "cloudinary";
import dotenv from 'dotenv'

dotenv.config({
  path : './config/config.env'
})

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret,
});

dbConnect()



const server = app.listen(process.env.PORT,() => {
    console.log(`server is listening on port:${process.env.PORT}`)
})

const io = new Server(server, {
    pingTimeout:1000*60,
    allowEIO3: true,
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
  });
  
  
  
  io.on('connection',(socket) => {
    socket.on('setup',(userData) => {
        socket.join(userData._id)
        socket.emit('connected')
    })
    socket.on('join room',(room) => {
        console.log('user joined room: '+ room)
    })
  
    socket.on("like",(user) => {
        socket.emit('liked',user)
    })
    socket.on('comment',(comment) => {
      socket.emit('commented',comment)
    })

    socket.on("comment",(commentData) => {
        socket.emit('new comment',commentData)
    })
   
    socket.off('disconnect',() => {
      console.log("user disconnected")
    })
  })