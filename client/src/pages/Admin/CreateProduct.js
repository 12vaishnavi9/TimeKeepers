import React,{useState,useEffect} from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import {Select} from "antd";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

//destructuring:-
const {Option}=Select//can create dropdown menu

const CreateCategory=()=>{

    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        // Other Axios configuration options...
    });



    const [categories,setCategories]=useState([]);//jitni bhi categories hain unko ek select box me edd kr dege
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState("");
    const [quantity,setQuantity]=useState("");
    const [shipping,setShipping]=useState("");
    const [photo,setPhoto]=useState("");

    const navigate=useNavigate();

    //to get all categories:-(same as create cateogry)
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

    const handleCreate=async(e)=>{
        e.preventDefault()
        try{

            //since there is a photo also therefore will use browser property ie. form data
            // The FormData object is commonly used when working with 
            // file uploads or when sending data in a format compatible with a form submission.
            const productData=new FormData()
            productData.append("name",name)
            productData.append("description",description)
            productData.append("price",price)
            productData.append("category",category)
            productData.append("photo",photo)
            productData.append("quantity",quantity)
            //console.log(productData);

            const res= await instance.post("/api/v1/product/create-product",productData)
    if(res?.data?.success){
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");//will create products page
    }else{
       toast.error(res.data.message);
    }
        }catch(err){
            console.log(err)
            toast.error("Something went wrong")
        }
    }
    
  
    return(
        <>
           <div className="container-fluid adminDiv m-3 p-3">
                <div className="row">
                <div className="col-md-3 "><AdminMenu/></div>
                <div className="col-md-6">
                <div className="card w-300 p-3 borderfor headingss">
                    <h1>Create Product</h1>
                    <div className="m-1">
                        <Select border={false} placeholder="Select a Category" 
                            size="large" showSearch clasName="form-select mb-3" 
                            onChange={(value)=>setCategory(value)} style={{ width: '525px' }}>
                            {/* The onChange prop in the Select component is a callback function that is called when the user selects an option from the dropdown menu. It receives the value of the selected option as an argument.
                             In the provided code, the onChange prop is used to update the category state with the selected value. */}
                            {
                                categories?.map(c=>(
                                    <Option key={c._id} value={c._id}>{c.name}</Option>
                                ))
                            }
                        </Select>
                        <div className="mb-3">
                            <label className="col-md-12 btn btn-outline-secondary mt-5 w-500">
                                {photo ? photo.name : "Upload Photo"}
                                <input type="file" name="photo" accept="image/*" //will accept any type of image png,jpeg etc...
                                onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                                {/* files is an array */}
                            </label>
                        </div>
                        <div className="mb-3">
                            {
                                photo && (
                                    <div className="text-center">
                                    <img src={URL.createObjectURL(photo)}
                                    alt="product"
                                    height={"200px"}
                                    className="img img-responsive"/>
                                    </div>
                                    /* URL.createObjectURL method, which creates a temporary URL for the selected photo. */
                                )
                            }
                        </div>

                        <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a Name"
                  className="form-control create-product-form"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a Description"
                  className="form-control create-product-form"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a Price"
                  className="form-control create-product-form"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write a Quantity"
                  className="form-control create-product-form"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3 create-product-form"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-outline-secondary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default CreateCategory;