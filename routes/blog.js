import express from 'express'
import { CreateBlog, getAllBlogs, getUserBlogs,getBlogById, deleteBlogById, EditBlogById } from '../controllers/blog.js'
import { isAuthanticated } from '../middlewares/auth.js'
const router  =  express.Router()

router.get('/all',getAllBlogs)
router.post('/create',isAuthanticated,CreateBlog)
router.post('/edit',isAuthanticated,EditBlogById)
router.get('/myblogs',isAuthanticated,getUserBlogs)
router.post("/delete",isAuthanticated,deleteBlogById)
router.get('/:id',getBlogById)


export default router