import React,{useState,useEffect} from "react";
import axios from "axios";

export default function useCategory(){
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        // Other Axios configuration options...
    });

    const [categories,setCategories]=useState([]);

    const getCategories=async()=>{
        try{
            const {data}=await instance.get("/api/v1/category/get-category");
            setCategories(data?.category)
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getCategories();
    },[])

    return categories;//custom hook created
}