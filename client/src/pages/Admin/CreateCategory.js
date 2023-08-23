import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import CategoryForm from "../../components/Layout/Forms/CategoryForm";
import { useAuth } from "../../context/Contextt";
import {Modal} from "antd";
import { ToastContainer, toast } from 'react-toastify';

const CreateCategory = () => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        // Other Axios configuration options...
    });

    const [categories, setCategories] = useState([]);//multiple values rhegi toh hum array ka use kr rhe hain
    const [name,setName]=useState("");
    const [auth]=useAuth();
    
    //FOR MODAL:-
    const [visible,setVisible]=useState(false);

    //MODAL KE ANDAR CATEGORY FORM KO ADD KRNE KE LIYE:-
    const [selected,setSelected]=useState(null);
    const [updatedName,setUpdatedName]=useState("");

   //submit form:-
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const token = localStorage.getItem("auth"); // Assuming you have stored the JWT token in localStorage after successful login
      const { token } = auth;
      const headers = {
        Authorization: token ? `Bearer ${token}` : "",
      };

      const { data } = await instance.post(
        "/api/v1/category/create-category",
        { name ,headers}
      );
  
      if (data?.success) {
        toast.success("Category is created");
        getAllCategory();
      } else {
        toast.error("Error occurred");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while creating the category");
    }
  };
  
    //fucntion for getting all categories:-
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

    const handleUpdate=async(e)=>{
        e.preventDefault()
        try{
            const {data}=await instance.put(`/api/v1/category/update-category/${selected._id}`,{name:updatedName});
            if(data.success){
                toast.success("Updated Successfully")
                setSelected(null)
                setUpdatedName("")
                setVisible(false)//submit krne pe popup model should be closed
                getAllCategory();
            }
            else{
                toast.error("Error while updating products")
            }
        }catch(error){
            toast.error("Something went wrong")
        }
    }

    const handleDelete=async(id)=>{
        try{
            const res=await instance.delete(`/api/v1/category/delete-category/${id}`);
            if(res.data.success){
                toast.success("Deleted Successfully")
                getAllCategory();
            }
            else{
                toast.error("Error while deleting product")
            }
        }catch(error){
           toast.error("Something went wrong")
        }
    }
    return (
        <>
            <div className="container-fluid adminDiv m-3 p-3">
                <div className="row">
                    <div className="col-md-3 m-10"><AdminMenu /></div>
                    <div className="col-md-6">
                        <div className="card w-75 p-3 borderfor headingss">
                            <h1>Manage Category</h1>
                            <div className="p-3 w-50">
                                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} /> 
                            </div>
                            <div className="w-75">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                        {
                                            categories?.map(c=>(
                                                <>
                                                <tr>
                                                <td key={c._id}>{c.name}</td>
                                        <td>
                                        <button onClick={()=>{setVisible(true);setUpdatedName(c.name);setSelected(c)}} //modal popup hojyega
                                        className="btn btn-primary btn-edit" style={{ backgroundColor: 'black', color: 'white' }}>Edit</button>
                                        <button className="btn btn-primary btn-delete"  style={{ backgroundColor: 'black', color: 'white' }}
                                        onClick={()=>{handleDelete(c._id)}}>Delete</button>
                                        </td>
                                        </tr>
                                        </>
                                        ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
                                <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateCategory;


