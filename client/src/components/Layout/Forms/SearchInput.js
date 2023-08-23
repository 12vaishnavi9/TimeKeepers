import React,{useState,useEffect} from "react";
import { useSearch } from "../../../context/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchInput=()=>{
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        // Other Axios configuration options...
    });

    const navigate=useNavigate();
    const [values,setValues]=useSearch();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const {data}=await instance.get(`/api/v1/product/search/${values.keyword}`)
            setValues({...values,results:data});
            navigate("/search");
        }catch(err){
            console.log(err);
        }
    }
    return(
        <>
  <div className="searchInput">
      <form className="d-flex searchcss" role="search" onSubmit={handleSubmit}>
    <input className="form-control me-2 adjust" type="search" placeHolder="Search" 
        aria-label="Search" value={values.keyword} onChange={(e)=>setValues({...values,keyword:e.target.value})}/>
            <button className="btn btn-outline-white adjustbtn"  type="submit">
        SEARCH</button>
      </form>
        </div>
        </>
    )
}

export default SearchInput;