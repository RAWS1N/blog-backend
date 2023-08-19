import express from 'express'
import { CreateUser, getMyProfile, loginUser, logoutUser } from '../controllers/user.js'
import { isAuthanticated } from '../middlewares/auth.js'


const router = express.Router()

router.post('/create',CreateUser)
router.post('/login',loginUser)
router.get('/logout',isAuthanticated,logoutUser)
router.get('/profile',isAuthanticated ,getMyProfile)


export default router