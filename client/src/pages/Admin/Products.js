import React,{useEffect,useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import AdminMenu from "./AdminMenu";
import axios from "axios";
import {NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Products=()=>{

    const navigate=useNavigate();
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        // Other Axios configuration options...
    });

    const [products,setProducts]=useState([]);

    //get all products:-
    const getAllProducts=async()=>{
        try{
            const res=await instance.get("/api/v1/product/get-product");
            setProducts(res.data.products)
        }catch(err){
            console.log(err)
          toast.error("Something went wrong")
        }
    }


    useEffect(()=>{
        getAllProducts();
    },[]) 
    return(
        <div className="productmaindiv">
        <div className="d-flex">
        <div className="col-md-3 m-3 mt-0"><AdminMenu/></div>
        <div className="col-md-9">
        <h1 className="text-center">All Products List</h1>
        <div className="d-flex flex-wrap">
                    {
                    products?.map(p=>(
                        <>
                        <NavLink to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                        <div className="card m-2" style={{width: "18rem"}}   >
  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name}/>
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description}</p>
    <p className="card-text">{p.price}</p>
  </div>
</div></NavLink>
                        </>
                    ))
                   }
                    </div>
        </div>
        </div>
        </div>
    )
}

export default Products;






