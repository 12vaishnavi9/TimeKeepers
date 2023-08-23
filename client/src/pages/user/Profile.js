import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/Contextt";
import axios from "axios";
const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (


    <>
            <div className="container-fluid adminDiv m-3 p-3">
                 <div className="row">
                 <div className="col-md-3 "><UserMenu/></div>
                 <div className="col-md-6">
                 <div className="card w-75 p-3 borderfor">
                     <div className="row">
                     <form onSubmit={handleSubmit}>
                     <div className="mb-3">
                         <input type="text" value={name} onChange={(event)=>setName(event.target.value)} className="form-control" id="exampleInputName" placeholder="Enter Your name"/>
                     </div>
                     <div className="mb-3">
                         <input type="email" value={email} onChange={(event)=>setEmail(event.target.value)} className="form-control" id="exampleInputEmail" placeholder="Enter Your Email" />
                     </div>
                     <div className="mb-3">
                         <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter Your password" />
                     </div>
                     <div className="mb-3">
                         <input type="text" value={phone} onChange={(event)=>setPhone(event.target.value)}className="form-control" id="exampleInputPhone" placeholder="Enter Your Phone" />
                       </div>
                       <div className="mb-3">
                           <input type="text" value={address} onChange={(event)=>setAddress(event.target.value)} className="form-control" id="exampleInputAddress" placeholder="Enter Your Address" />
                       </div>
                       <button type="submit" className="btn blackButton">UPDATE</button>
                   </form>
                       </div>
                     </div>
                     </div>
                    </div>
                </div>
            </>
  );
};

export default Profile;