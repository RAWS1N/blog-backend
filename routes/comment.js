import express from 'express'
import { addComment, removeComment } from '../controllers/comment.js'
import { isAuthanticated } from '../middlewares/auth.js'

const router = express.Router()

router.post("/add",isAuthanticated,addComment)
router.post('/remove',isAuthanticated,removeComment)


export default router