import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            // remove whitespace
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
       phone:{
        // to add country code
            type:String,
            required:true,
        },
        address:{
            type:{},
            required:true,
        },
        answer:{
            type:String,
            required:true
        },
        role:{
            type:Number,
            default:0
        }
    },{timestamps:true}  //jab user add hoga toh uska created time add hojyega
)

export default mongoose.model('users',userSchema);
