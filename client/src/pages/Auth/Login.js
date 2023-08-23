import React,{useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/Contextt";
import { NavLink } from "react-router-dom";

const Login=()=>{

  const showToastMessage = () => {
    toast.success('Login Successfully!', {
        position: toast.POSITION.TOP_RIGHT
    });
};

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  //FOR TAKING USER AND TOKEN:-
  const [auth,setAuth]=useAuth();

   //since useNavigate is a hook therefore need to create a variable
   const navigate=useNavigate();


//   const instance = axios.create({
//     baseURL: process.env.REACT_APP_API_BASE_URL,
//     // Other Axios configuration options...
// });

  const handleSubmit=async (e)=>{
    e.preventDefault()//default refresh ni hoga
    try{
      if (!email || !password) {
        toast.error("Please enter both email and password"); // Display error message for empty fields
        return;
      }
        const res=await axios.post("/api/v1/auth/login",
        {email,password});
        
        //jo hume jab backend ka code likha tha for signing in a user , tab usme humne response diye the
        //ab unhi responses ko alert kara denge
        if(res.data.success){
            // toast.success("Login Successfully!");
            
            // yahan hum data localstorage me save karege from backend:-
            setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token
            })
            //set data in local storage:-
            localStorage.setItem("auth",JSON.stringify(res.data));
            // ab backend s lene le baad contextt.js me jao or hmesha ke liye store krdege.

            showToastMessage();
            navigate("/");
        }
        else{
           toast.error("Incorrect password or email"); //ab iske baad navigation krege
        }
    }catch(err){
        console.log(err);
        toast.error("Something went wrong")
    }
}
return(
//         <>
//           <div className="register">
//           <h1>Welcome!</h1>
//           <br></br>
//           <form onSubmit={handleSubmit}>
//   <div className="mb-3">
//     <input type="text" className="form-control" id="exampleInputEmail" 
//     value={email} onChange={(event)=>setEmail(event.target.value)} placeholder="Enter your Email" />
//   </div>
//   <div className="mb-3">
//     <input type="password" className="form-control" id="exampleInputPassword1" 
//     value={password} onChange={(event)=>setPassword(event.target.value)} placeholder="Enter your password"/>
//   </div>
//   <div className="login">
//   <div>
//   <button type="submit" className="btn ms-5 w-40" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
//   </div>
//   <br></br>
//   <button  type="submit" className="btn mt-3 ms-5">Login</button>
//   </div>

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

                    <h5 className="fw-normal mb-2 pb-2" style={{ letterSpacing: "1px" }}>Sign into your account</h5>

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

                    <div className="pt-1 mb-4">
                    <button  type="submit" className="btn btn-outline-secondary">Login</button>
                    {/* <NavLink to="/login"> <button className="btn  btn-black" >Login</button></NavLink> */}
                    </div>
                    <NavLink to="/forgot-password"> <a className="small text-muted">Forgot password?</a></NavLink>
                   <NavLink to="/register"> <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>Don't have an account? <a href="#!"
                      style={{ color: "#393f81" }}>Register here</a></p></NavLink>
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

export default Login;