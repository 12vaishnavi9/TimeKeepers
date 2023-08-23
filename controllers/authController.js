import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { hashPassword,comparePassword } from "../helpers/authHelper.js";
import Jwt from "jsonwebtoken";

//USER REGISTRATION
export const registerController=async(req,res)=>{
    try{
        const {name,email,password,phone,address,answer}=req.body
        if(!name){
            return res.send({message:"Name is Required"})
        }
        if(!email){
            return res.send({message:"Email is Required"})
        }
        if(!password){
            return res.send({message:"Password is Required"})
        }
        if(!phone){
            return res.send({message:"Phone Number is Required"})
        }
        if(!address){
            return res.send({message:"Address is Required"})
        }
        if(!answer){
            return res.send({message:"Favourite Movie is Required"})
        }
        
        //check if user is already registered or not:-
        const checkUser=await userModel.findOne({email});

        //for existing user:-
        if(checkUser){
            return res.status(200).send({
                success:false,
                message:"Already registered please login!",
            })
        }

        //create a new user
        const hashedPassword=await hashPassword(password)//hashPassword is a function defined in authHelper.js in helpers
        //that is used to hash the password to provide security.

        //save
        const user=await new userModel({name,email,phone,address,password:hashedPassword,answer}).save()//same values as in schema

        res.status(201).send({
            success:true,
            message:"User Registered Successfully",
            user
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            err
        })
    }
}

//LOGIN
export const loginController=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }

        //check if user is present
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
            })
        }

        //if email is registered then check for password:-
        const match=await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Incorrect Password"
            })
        }

        //token:-
    const token=await Jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

    //send response:-
    res.status(200).send({
        success:true,
        message:"Login successfully",
        user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role
        },
        token
    })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"Error in login",
            err
        })
    }
}

//testContoller:-
export const testController=async(req,res)=>{
    try{
        res.send("protected route")
    }catch(err){
        console.log(err)
        res.send({err})
    }
}

//forgotPasswordController

// export const forgotPasswordController = async (req, res) => {
//     try {
//       const { email, answer, newPassword } = req.body;
//       if (!email) {
//         res.status(400).send({ message: "Emai is required" });
//       }
//       if (!answer) {
//         res.status(400).send({ message: "answer is required" });
//       }
//       if (!newPassword) {
//         res.status(400).send({ message: "New Password is required" });
//       }
//       //check
//       const user = await userModel.findOne({ email, answer });
//       //validation
//       if (!user) {
//         return res.status(404).send({
//           success: false,
//           message: "Wrong Email Or Answer",
//         });
//       }
//       const hashed = await hashPassword(newPassword);
//       await userModel.findByIdAndUpdate(user._id, { password: hashed });
//       res.status(200).send({
//         success: true,
//         message: "Password Reset Successfully",
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         success: false,
//         message: "Something went wrong",
//         error,
//       });
//     }
//   };
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
  
  export const updateProfileController=async(req,res)=>{
    try{
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
          return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
          req.user._id,
          {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,
          },
          { new: true }
        );
        res.status(200).send({
          success: true,
          message: "Profile Updated SUccessfully",
          updatedUser,
        });
    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error while updating profile",
            err
        })
    }
  }

export const getOrdersController=async(req,res)=>{
    try{
        const orders=await orderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name");
        res.json(orders);
    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error While Getting Orders",
            err
        })
    }
}

export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  
export const orderStatusController=async(req,res)=>{
    try{
        const {orderId}=req.params;
        const {status}=req.body;
        const orders=await orderModel.findByIdAndUpdate(orderId,{status},{new:true});
        res.json(orders);
    }catch(err){
        console.log(err);
        res.status(500).send({
        success:false,
        message:"Error while updating order status",
        err
        })
    }
}