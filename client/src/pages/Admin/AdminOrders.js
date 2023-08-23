import React,{useState,useEffect} from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/Contextt";
import {Select} from "antd";


const {Option}=Select;

const AdminOrders=()=>{

    const [status,setStatus]=useState(["Not Processed","Processing","Shipped","Delivered","Cancel"]);
    const [changeStatus,setChangeStatus]=useState("");

    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
       // Other Axios configuration options...
    });

    const [orders,setOrders]=useState([]);
    const [auth,setAuth]=useAuth();
 
    const getOrders=async()=>{
        try{
            const {data}=await instance.get("/api/v1/auth/all-orders")
            setOrders(data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        if(auth?.token) getOrders();
    },[auth?.token])

    const handleChange = async (orderId, value) => {
        try {
          const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
            status: value,
          });
          getOrders();
        } catch (error) {
          console.log(error);
        }
      };
    return(
        <>
             <div className="container-fluid adminDiv m-3 p-3">
                <div className="row">
                <div className="col-md-3 "><AdminMenu/></div>
                <div className="col-md-9">
                <h1 className="text-center">All Orders</h1>
                {
                        orders.map((o,i)=>{
                            return(
                                <>
                                    <div>
                                    <table className="table border shadow">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>{i+1}</th>
                                                <td>
                                                <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                                                </td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createdAt).fromNow()}</td>
                                                <td>{o?.payment.success ? "Success":"Failed"}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"150px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                </div>
            </div>
        </>
    )
}

export default AdminOrders;