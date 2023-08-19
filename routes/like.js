import express from 'express'
import { likeBlog } from '../controllers/like.js'
import { isAuthanticated } from '../middlewares/auth.js'


const router = express.Router()


router.post('/',isAuthanticated,likeBlog)



export default router