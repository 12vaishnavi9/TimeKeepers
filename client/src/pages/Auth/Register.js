import React, { useState } from "react";
import {ToastContainer,toast} from "react-toastify";
import axios from "axios";
import {useNavigate,NavLink} from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer,setAnswer]=useState("");

    //since useNavigate is a hook therefore need to create a variable
    const navigate=useNavigate();

    //form jab submit krege tb handleSubmit function run krega:-
    // It prevents the default form submission behavior, sends a POST request to the
    //  "/api/v1/auth/register" endpoint with the registration data, and handles the response accordingly.
    //   If the registration is successful (res.data.success is true), an alert is displayed,
    //  and the user is navigated to the "/login" page. Otherwise, an alert is displayed.

    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        // Other Axios configuration options...
    });

    // await axios.post("/api/v1/auth/register"

    const handleSubmit=async (e)=>{
        e.preventDefault()//default refresh ni hoga
        try{
            const res=await instance.post("/api/v1/auth/register",
            {name,email,password,phone,address,answer});
            
            //jo hume jab backend ka code likha tha for registering a user , tab usme humne response diye the
            //ab unhi responses ko alert kara denge
            if(!res.data.success){
               toast.error(res.data.message);
            }
            if(res.data.success){
                toast.success(res.data.message);
               navigate("/login");
            }
            // else{
            //     toast.error(res.data.message); //ab iske baad navigation krege
            // }
        }catch(err){
            console.log(err);
            toast.error("Something went wrong")
        }
    }

    return (
      
        //       <> 
        //     <div className="register">
        //         <h1>Register here!</h1>
        //         <br></br>
        //         <form onSubmit={handleSubmit}>
        //             <div className="mb-3">
        //                 <input type="text" value={name} onChange={(event)=>setName(event.target.value)} className="form-control" id="exampleInputName" placeholder="Enter Your name"/>
        //             </div>
        //             <div className="mb-3">
        //                 <input type="email" value={email} onChange={(event)=>setEmail(event.target.value)} className="form-control" id="exampleInputEmail" placeholder="Enter Your Email" />
        //             </div>
        //             <div className="mb-3">
        //                 <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter Your password" />
        //             </div>
        //             <div className="mb-3">
        //                 <input type="text" value={phone} onChange={(event)=>setPhone(event.target.value)}className="form-control" id="exampleInputPhone" placeholder="Enter Your Phone" />
        //             </div>
        //             <div className="mb-3">
        //                 <input type="text" value={address} onChange={(event)=>setAddress(event.target.value)} className="form-control" id="exampleInputAddress" placeholder="Enter Your Address" />
        //             </div>
        //             <div className="mb-3">
        //                 <input type="text" value={answer} onChange={(event)=>setAnswer(event.target.value)} className="form-control" id="exampleInputAnswer" placeholder="Enter Your Favourite Movie Name" />
        //             </div>
        //             <button type="submit" className="btn ">Register</button>
        //         </form>
        //     </div>
        // </> 
        <>
  <div className="mt-4">
  <section className="vh-100" style={{ backgroundColor: "black" }}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center ">
        <div className="col col-xl-10">
          <div className="card" style={{ borderRadius: "1rem" }}>
            <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img src="https://th.bing.com/th/id/OIP.DyLKYCeL5JomEzPMcMA2_QHaLH?pid=ImgDet&w=1600&h=2400&rs=1"
                  alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem",height:"600px" }} />
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">

                  <form onSubmit={handleSubmit}>

                    <div className="d-flex align-items-center mb-1 pb-1">
                      <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                      <span className="h1 fw-bold mb-0">Timekeepers</span>
                    </div>

                    <h5 className="fw-normal mb-2 pb-2" style={{ letterSpacing: "1px" }}>Register your account</h5>

                    <div className="form-outline mb-4">
                    <input type="text" value={name} onChange={(event)=>setName(event.target.value)} 
                    className="form-control" id="exampleInputName"/>
                      <label className="htmlForm-label" htmlFor="form2Example17">Your Name</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="email" id="form2Example17" className="form-control form-control-lg" 
                        value={email} onChange={(event)=>setEmail(event.target.value)}
                      />
                      <label className="htmlForm-label" htmlFor="form2Example17">Email address</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" id="form2Example27" className="form-control form-control-lg" 
                        value={password} onChange={(event)=>setPassword(event.target.value)}
                      />
                      <label className="htmlForm-label" htmlFor="form2Example27">Password</label>
                    </div>
                   
                    <div className="form-outline mb-4">
                    <input type="text" value={phone} onChange={(event)=>setPhone(event.target.value)}
                    className="form-control" id="exampleInputPhone"/>
                      <label className="htmlForm-label" htmlFor="form2Example17">Phone Number</label>
                    </div>
                    <div className="form-outline mb-4">
                    <input type="text" value={address} onChange={(event)=>setAddress(event.target.value)} 
                    className="form-control" id="exampleInputAddress"  />
                      <label className="htmlForm-label" htmlFor="form2Example17">Address</label>
                    </div>
                    <div className="form-outline mb-4">
                    <input type="text" value={answer} onChange={(event)=>setAnswer(event.target.value)} 
                    className="form-control" id="exampleInputAnswer"  />
                      <label className="htmlForm-label" htmlFor="form2Example17">Favourite Movie</label>
                    </div>

                    <div className="pt-1 mb-4">
                    <button  type="submit" className="btn btn-outline-secondary">Register</button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</>
    )
}

export default Register;