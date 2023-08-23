import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";

//configure env:-
dotenv.config();

//connect to database:-
connectDB();

//rest object:- to call express, add express functionality.
const app=express();

//enable cors
app.use(cors());

//middlewares:-
app.use(express.json());
// app.use(formidable());

//routes:-
app.use('/api/v1/auth',authRoute);
//categoryRoute:-
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoute)
//It is a middleware function that is used to define routes related to authentication in an Express application. 
// It specifies that any request with a URL that starts with "/api/v1/auth" 
// should be handled by the authRoutes router.
// When you define routes in the authRoutes router, you can specify additional path
//  segments that will be appended to the base path "/api/v1/auth". 
//  For example, if you define a route in authRoutes with the path "/login",
//   the complete URL to access that route would be "/api/v1/auth/login".

//rest api:-
app.get("/",(req,res)=>{
    res.send("<h1>home</h1>");
})

//port:-
const PORT=process.env.PORT || 8080

//run app:-
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})