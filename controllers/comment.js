import { ErrorHandler } from "../middlewares/ErrorMiddleware.js"
import Blog from "../models/Blog.js"
import Comment from "../models/Comment.js"

export const addComment = async(req,res,next) => {
    const {comment,blogId} = req.body
    const {_id:userId} = req.user
    try {
        const createdComment = await Comment.create({comment,user:userId})
        const updated_blog = await Blog.findOneAndUpdate({_id:blogId},{$push:{comments:createdComment._id}},{new:true})
        const commentData = await Comment.findById(createdComment._id).populate('user',['name',"picture"])
        res.status(201).json({success:true,message:'Comment added Successfully',comment:commentData})
    }
    catch(e){
        return next(new ErrorHandler('',e.message))
    }
}


export const removeComment = async(req,res,next) => {
    const {commentId,blogId} = req.body
    try {
        await Blog.updateOne({_id:blogId},{$pull:{comments:commentId}})
        res.status(200).json({success:true,message:'Comment removed Successfully'})
    }
    catch(e){
        return next(new ErrorHandler('',e.message))
    }
}