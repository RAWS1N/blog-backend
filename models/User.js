import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    name : {type:String,required:true},
    password : {type:String,required:true,select:false},
    email : {type:String,required:true,unique:true},
    picture : {type:String,default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
    blogs : [{type:mongoose.Schema.Types.ObjectId,ref:'blog'}],
},{ timestamps: true })


const User = mongoose.model('user',userSchema)
export default User