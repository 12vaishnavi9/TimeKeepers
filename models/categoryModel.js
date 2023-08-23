import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    slug:{
        type:String,
        lowercase:true
    }
    // npm i slugify:- react learn.js:- react-learn-js
})

export default mongoose.model('Category',categorySchema);