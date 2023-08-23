import express from "express";
import { registerController,loginController,testController,forgotPasswordController
,updateProfileController, getOrdersController,getAllOrdersController,orderStatusController } from "../controllers/authController.js";
import {requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";

//router object:-
const router=express.Router();

//routing
//REGISTRATION || METHOD POST
router.post('/register',registerController)//basically registerController me hum user create krege. Agr hum chahe
//toh registerController ki jagah ek callback function  bhi de skte hain

//LOGIN || METHOD POST
router.post('/login',loginController)

//test route
router.get('/test',requireSignIn,isAdmin,testController)//middleware jo verify kr rha h token ko

//PROTECTED ROUTE FOR DASHBOARD ir. USER:-
router.get('/user-auth',requireSignIn,(req,res)=>{
    // requiresignin is for verifying token
    res.status(200).send({ok:true});
})

//PROTECTED ROUTE FOR DASHBOARD ie. ADMIN:-
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    // requiresignin is for verifying token
    res.status(200).send({ok:true});
})

//PATH FOR FORGOT PASSWORD:-
router.post('/forgot-password',forgotPasswordController)

//route to update profile of user:-(profile.js)
router.put("/profile",requireSignIn,updateProfileController);

//orders
router.get("/orders",requireSignIn,getOrdersController);

//get all orders for admin orders:-
router.get("/all-orders",requireSignIn,isAdmin,getAllOrdersController);

//order-status-update
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController);
export default router;