import React,{useState,useEffect} from "react";
import { useAuth } from "../../context/Contextt";
import {Outlet} from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Layout/Spinner";

const AdminRoute=()=>{
    const [ok,setOk]=useState(false);
    const [auth,setAuth]=useAuth();
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        // Other Axios configuration options...
    });

    useEffect(()=>{
        const authCheck=async()=>{
            try{
                const res=await instance.get("/api/v1/auth/admin-auth",
            {
                headers:{
                    "Authorization":auth?.token
                    // optional chaining operator 
                }
            })
            if(res.data.ok && auth?.user?.role === 1){
                setOk(true)
            }
            else{
                setOk(false)
            }
        }catch(error){
            console.log(error);
        }
            }
        if(auth?.token) authCheck()
        // In summary, if (auth?.token) ensures that the API request to check the user's 
        // authentication status is only made if there is a valid authentication token available. 
        // It prevents unnecessary API requests in cases where the authentication token is not present.

    },[auth?.token])
    return ok ? <Outlet/> : <Spinner/>
}

export default AdminRoute;