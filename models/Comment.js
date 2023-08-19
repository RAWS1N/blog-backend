import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    comment : {type:String},
    user : {type:mongoose.Schema.Types.ObjectId,ref:"user"},
},{timestamps:true})


const Comment = mongoose.model("Comment", commentSchema)
export default Comment