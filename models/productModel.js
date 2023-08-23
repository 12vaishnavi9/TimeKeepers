import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        lowercase:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:"Category",//category model me jo name diya hai tbhi relationship bnega
        //jab bhi category ki id generate hogi wahi pass kra dege yahan
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    photo:{
        data:Buffer,//to save image and file
        contentType:String
    },
    shipping:{
        type:Boolean
    }
},{timestamps:true});

export default mongoose.model("Products",productSchema)
