import React,{useState,useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/Cart";

const MoreDetails=()=>{
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        // Other Axios configuration options...
    });
    const [cart,setCart]=useCart();
    const handleAddToCart = (product) => {
        setCart([...cart, product]);
        toast.success("Item Added to Cart");
      };

    const params=useParams();
    const [product,setProduct]=useState();
    //for similar products:-
    const [similarProducts,setSimilarProducts]=useState([]);

    useEffect(()=>{
        if(params?.slug) getProduct();
    },[params?.slug])

    const getProduct=async()=>{
        try{
            const {data}=await instance.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product);
            getSimilarProducts(data?.product?._id,data?.product?.category?._id);
        }catch(err){
            console.log(err);
        }
    }

    //for similar products:-
    const getSimilarProducts=async(pid,cid)=>{
        try{
            const {data}=await instance.get(`/api/v1/product/related-products/${pid}/${cid}`)
            setSimilarProducts(data?.products);
        }catch(err){
            console.log(err);
        }
    }//now pass this function in getProduct
    return(
        <>
            <div className="row container more-details">
                <div className="col-md-6">
                    {/* image */}
                    {
                        product&&(
                            <>
                            <img src={`/api/v1/product/product-photo/${product._id}`}  className="card-img-top"
                             style={{ height: "400px" }} alt={product.name}/>
                            </>
                        )}
                </div>
                <div className="col-md-6">
                <h1 className="text-center">Product Details</h1>
                  {
                    product&&(
                        <>
                            <h6>Name : {product.name}</h6>
                            <h6>Description : {product.description}</h6>
                            <h6>Price : `₹{product.price}`</h6>
                            <h6>Category : {product.category.name}</h6>
                            <button className="btn blackButton ms-1" style={{marginTop:"15px"}} onClick={() => handleAddToCart(product)}>ADD TO CART</button>
                        </>
                    )
                  }
                </div> 
                <div className="row conatiner">
               <h1 className="text-center">Similar Products</h1>
               {similarProducts.length<1&&<p className="text-center">No Similar Products Found</p>}
               <div className="d-flex flex-wrap">
                    {
                    similarProducts?.map(p=>(
                        <>
                        <div className="card m-2" style={{width: "18rem"}}   >
  <img src={`/api/v1/product/product-photo/${p._id}`} class="card-img-top" alt={p.name}/>
  <div class="card-body">
    <h5 class="card-title">{p.name}</h5>
    <p class="card-text">{p.description.substring(0,30)}</p>
    <p class="card-text">₹ {p.price}</p>
    <button className="btn blackButton ms-1" style={{marginTop:"5px"}} onClick={() => handleAddToCart(p)}>ADD TO CART</button>
  </div>
</div>
                        </>
                    ))
                   }
                   </div>
                </div>
            </div>
        </>
    )
}

export default MoreDetails;