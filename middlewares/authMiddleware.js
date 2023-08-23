// import JWT from "jsonwebtoken";
// import userModel from "../models/userModel.js";

// //middleware for signing in
// export const requireSignIn=async(req,res,next)=>{//next needs to be executed
//     try{
//         const decode=JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
//         req.user=decode;//payload is assigned ie. values of entities
//         next();
//     }catch(err){
//         console.log(err);
//     }
// }

// //middleware for admin
// export const isAdmin=async(req,res,next)=>{
//     try{
//         const userr =await userModel.findById(req.user._id);
//         if(userr.role!==1){
//             return res.status(401).send({
//                 success:false,
//                 message:"Unauthorized Access"
//             })
//         }
//         else{
//             next()
//         }
//     }catch(err){
//             console.log(err)
//             res.send("Error in middleware")
//     }
// }

import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};