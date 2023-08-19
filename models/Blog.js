import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    author : {type:mongoose.Schema.Types.ObjectId,ref:'user'},
    title:{type:String,required:true},
    description : {type:String,required:true},
    comments : [{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}],
    likes : [{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
    image : {
        type:String,
        default : "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    },
},{timestamps:true})


const Blog = mongoose.model('blog', blogSchema)
export default Blog