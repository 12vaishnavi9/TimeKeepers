import React,{useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const ForgotPass=()=>{
  const [email,setEmail]=useState("");
  const [answer,setAnswer]=useState("");
  const [newPassword,setNewPassword]=useState("");  

   //since useNavigate is a hook therefore need to create a variable
   const navigate=useNavigate();

  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    // Other Axios configuration options...
});

  const handleSubmit=async (e)=>{
    e.preventDefault()//default refresh ni hoga
    try{
      if (!email || !newPassword ||!answer) {
        toast.error("All fields are required"); // Display error message for empty fields
        return;
      }
        const res=await instance.post("/api/v1/auth/forgot-password",
        {email,newPassword,answer});
        console.log("hello")
        
        //jo hume jab backend ka code likha tha for signing in a user , tab usme humne response diye the
        //ab unhi responses ko alert kara denge
        console.log("hello")
        if(res.data.success){
            toast.success(res.data.message);
            navigate("/login");
        }
        else{
            toast.error(res.data.message); //ab iske baad navigation krege
        }

        // if(res&&res.data&&res.data.success){
        //   alert(res.data&&res.data.message);
        //   navigate("/login")
        // }
        // else{
        //   alert(res.data.message);
        // }
    }catch(err){
        console.log(err);
        toast.error("Something went wrong")
    }
}
    return(
//         <>
//           <div className="register">
//           <h1>Reset Password</h1>
//           <br></br>
//           <form onSubmit={handleSubmit}>
//   <div className="mb-3">
//     <input type="email" className="form-control" id="email" 
//     value={email} onChange={(event)=>setEmail(event.target.value)} placeholder="Enter Your Email" />
//   </div>
//   <div className="mb-3">
//     <input type="text" className="form-control" id="answer" 
//     value={answer} onChange={(event)=>setAnswer(event.target.value)} placeholder="Enter Your Favourite Movie" />
//   </div>
//   <div className="mb-3">
//     <input type="password" className="form-control" id="password" 
//     value={newPassword} onChange={(event)=>setNewPassword(event.target.value)} placeholder="Enter Your New Password"/>
//   </div>
//   <button type="submit" className="btn ">Reset</button>
// </form>
//           </div>
//         </>

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

                  <h5 className="fw-normal mb-2 pb-2" style={{ letterSpacing: "1px" }}>Reset Password</h5>

                  <div className="form-outline mb-4">
                    <input type="email" id="form2Example17" className="form-control form-control-lg" 
                      value={email} onChange={(event)=>setEmail(event.target.value)}
                    />
                    <label className="htmlForm-label" htmlFor="form2Example17">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" id="form2text" className="form-control form-control-lg" 
                      value={answer} onChange={(event)=>setAnswer(event.target.value)}
                    />
                    <label className="htmlForm-label" htmlFor="form2Example17">Favourite Movie</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example27" className="form-control form-control-lg" 
                      value={newPassword} onChange={(event)=>setNewPassword(event.target.value)}
                    />
                    <label className="htmlForm-label" htmlFor="form2Example27">New Password</label>
                  </div>

                  <div className="pt-1 mb-4">
                  <button  type="submit" className="btn btn-outline-secondary">Reset Password</button>
                  {/* <NavLink to="/login"> <button className="btn  btn-black" >Login</button></NavLink> */}
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

export default ForgotPass;


