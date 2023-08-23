import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Spinner=()=>{
    const [count,setCount]=useState(3);
    const navigate=useNavigate();

    useEffect(()=>{
        const interval= setInterval(()=>{
            setCount((prevValue)=> --prevValue);
        },1000);
        // 1000 milliseconds ke baad ye function run ho raha hai
        count===0 && navigate("/");
        return()=> clearInterval(interval);
    },[count,navigate]);
    // jab jab count ya navigate ki value hogi
    return(
        <>
        <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
        <h1 className="Text-center">Redirecting to you in {count} second</h1>
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
        </>
    )
}

export default Spinner;