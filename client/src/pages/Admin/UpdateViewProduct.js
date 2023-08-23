import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateViewProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
     toast.error("Something went wrong");
    }
  };
  return (
    <>
             <div className="container-fluid adminDiv m-3 p-3">
                <div className="row">
                <div className="col-md-3 "><AdminMenu/></div>
                <div className="col-md-6">
                <div className="card w-300 p-3 borderfor headingss">
                    <h1>Update Product</h1>
                    <div className="m-1">
                        <Select border={false} placeholder="Select a Category" 
                                size="large" showSearch clasName="form-select mb-3" 
                                onChange={(value)=>setCategory(value)} style={{ width: '525px' }} value={category}>                                {/* The onChange prop in the Select component is a callback function that is called when the user selects an option from the dropdown menu. It receives the value of the selected option as an argument.
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
                                    photo ? (
                                        <div className="text-center">
                                        <img src={URL.createObjectURL(photo)}
                                        alt="product"
                                        height={"200px"}
                                        className="img img-responsive"/>
                                        </div>
                                        /* URL.createObjectURL method, which creates a temporary URL for the selected photo. */
                                    ):(
                                        <div className="text-center">
                                        <img src={`/api/v1/product/product-photo/${id}`}
                                        alt="product"
                                        height={"200px"}
                                        className="img img-responsive"/>
                                        </div>
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
                      }} value={shipping  ? "Yes" : "No"}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-outline-secondary" onClick={handleUpdate}>
                      UPDATE PRODUCT
                    </button>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-outline-secondary" onClick={handleDelete}>
                      DELETE PRODUCT
                    </button>
                  </div>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
            </>
  );
};

export default UpdateViewProduct;