import React,{useState,useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import useCategory from "../../hooks/useCategory";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Categorydropdown=()=>{

    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        // Other Axios configuration options...
    });

    const categories=useCategory();
    return(
        <>
            <div className="container" style={{marginTop:"70px"}}>
                <div className="row">
                {
                    categories.map(c=>{
                        return(
                            <>
                            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                    <NavLink className="btn blackButton" to={`/category/${c.slug}`}>{c.name}</NavLink>
                    </div>
                            </>
                        )
                    })
                }
                </div>
            </div>
        </>
    )
}

export default Categorydropdown;