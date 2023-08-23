import React,{useEffect,useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "./context/Contextt";
import axios from "axios";
import {Checkbox} from "antd"; //for category filtering
import {Radio} from "antd";//for price filtering
import { Prices } from "./components/Layout/Pricesfilter";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/Cart";
import Footer from './pages/Footer';

const MainPage=()=>{

    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        // Other Axios configuration options...
    });

    const [auth,setAuth]=useAuth();
    const [products,setProducts]=useState([]);
    const [categories,setCategories]=useState([]);
    const [checked,setChecked]=useState([]);
    const [radio,setRadio]=useState([]);
    const [total,setTotal]=useState(0);
    const [page,setPage]=useState(1);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const [cart,setCart]=useCart();

    //get products:-
    // const getAllProducts=async()=>{
    //     try{
    //         const res=await instance.get("/api/v1/product/get-product");
    //         setProducts(res.data.products);
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
    // //get products after pagination:-
    const getAllProducts=async()=>{
         try{
            setLoading(true)
             const res=await instance.get(`/api/v1/product/product-list/${page}`);
             setLoading(false)
               setProducts(res.data.products);
           }catch(err){
            setLoading(false)
               console.log(err);
            }
        }


    //get all categories:-
    const getAllCategory = async () => {
        try {
            const {data} = await instance.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in getting product");
        }
    }
    useEffect(()=>{
        getAllCategory();
    },[])


    //pagination starts:-

     //get total count:-
     const getTotal = async () => {
        try {
          const { data } = await axios.get("/api/v1/product/product-count");
          setTotal(data?.total);
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(()=>{
        getTotal();
    })

    //loadmore:-
    useEffect(() => {
        if (page === 1) return;
        loadMore();
      }, [page]);
      //load more
      const loadMore = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
          setLoading(false);
          setProducts([...products, ...data?.products]);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
    
            // products is an existing state variable representing the list of products
            // , and data?.products is the new data obtained from the API response.
            // The spread operator ... is used twice to spread the elements of both the 
            // existing products state and the new data?.products array into a single array.
    //pagination ends



    //filter by category:-
    const handleFilter=(value,id)=>{
        let all=[...checked]
        console.log(all);
        if(value){
            all.push(id)
        }
        else{
            all=all.filter(c=>c!==id)
        }
        setChecked(all)
    }

    

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
      }, [checked.length, radio.length]);
    
      useEffect(() => {
        if (checked.length || radio.length) filterProduct();
      }, [checked, radio]);
    
      //get filterd product
      const filterProduct = async () => {
        try {
          const { data } = await instance.post("/api/v1/product/product-filters", {
            checked,
            radio,
          });
          setProducts(data?.products);
        } catch (error) {
          console.log(error);
        }
      };
    return(
        <>
            <div className="row mt-3">
                <div className="col-md-3 mt-4">
                    <h4 className="text-center">Filter By Category</h4>
                    <div className="ms-5 d-flex flex-column">
                    {
                        categories.map(c=>{
                            return(
                                <Checkbox key={c._id} 
                                 className="custom-checkbox" onChange={(e)=>handleFilter(e.target.checked,c._id)}>
                                {c.name}
                            </Checkbox>
                            )
                        })
                    }
                    </div>
                    {/* price filter */}
                    <h4 className="text-center mt-4">Filter By Price</h4>
                    <div className="ms-5 d-flex flex-column">
                    <Radio.Group onChange={e=>setRadio(e.target.value)}>
                        {
                            Prices.map(p=>(
                                <div key={p._id}>
                                <Radio value={p.array} className="custom-radio">{p.name}</Radio>
                                </div>
                            ))
                        }
                    </Radio.Group>
                    </div>
                    <div className="ms-5 d-flex flex-column">
                   <button className="btn blackButton mt-3" onClick={()=>window.location.reload()}>RESET FILTERS</button>
                    </div>
                </div>
                <div className="col-md-9">
                {/* {JSON.stringify(checked,null,4)} */}
                    <h1 className="text-center">All Products</h1>
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
    <button className="btn blackButton ms-1" onClick={()=>{setCart([...cart,p])
    toast.success("Item Added to Cart")}}>ADD TO CART</button>
  </div>
</div>
                        </>
                    ))
                   }
                   </div>
                   <div className="m-2 p-3">
                    {
                        products&&products.length<total&&(
                            <button className="btn btn-warning" onClick={(e)=>{
                                e.preventDefault();
                                setPage(page+1);
                            }}>
                            {loading ? "Loading..." : "Load more"}
                            </button>
                        )
                    }
                   </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default MainPage;