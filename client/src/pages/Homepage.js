import React from "react";
import Mainimage from "../components/Layout/Mainimage";
import { ToastContainer } from "react-toastify";
import MainPage  from "../MainPage";

const Homepage=()=>{
    return(
        <>
        <Mainimage></Mainimage>
        <MainPage/>
        </>
    )
}

export default Homepage;