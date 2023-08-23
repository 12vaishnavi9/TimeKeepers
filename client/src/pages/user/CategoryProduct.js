import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryProduct=()=>{

    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        // Other Axios configuration options...
    });

    const params=useParams();
    const navigate=useNavigate();
    const [category,setCategory]=useState([])
    const [products,setProducts]=useState([])

    const getProductByCategory=async()=>{
        try{
            const {data}=await instance.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
            console.log("Products Data:", data?.products);
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
      if(params?.slug)
      getProductByCategory();
  },[])
    return(
        <>
        <div style={{marginTop:"10px"}}></div>
        <div style={{marginTop:"10px"}}></div>
        <br></br>
        {products.length<0 ?"Loading...":(
            <div className="container mt-5">
            <h4 className="text-center">Category - {category?.name}</h4>
            <h6 className="text-center">{products?.length} result found </h6>
            <div className="row">
            <div className="d-flex flex-wrap">
                    {
                    products?.map(p=>(
                            <>
                        <div className="card m-2" style={{width: "18rem"}}   >
  <img src={`/api/v1/product/product-photo/${p._id}`} class="card-img-top" alt={p.name}/>
  <div class="card-body">
    <h5 class="card-title">{p.name}</h5>
    <p class="card-text">{p.description.substring(0,30)}</p>
    <p class="card-text">₹ {p.price}</p>
                
    <button className="btn blackButton ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
    <button className="btn blackButton ms-1">ADD TO CART</button>
    </div>
    </div>
    </>
    
                  
                    ))}
                    </div>
                   </div>
        </div>
        )}
           
           
        </>
    )
}

export default CategoryProduct;
