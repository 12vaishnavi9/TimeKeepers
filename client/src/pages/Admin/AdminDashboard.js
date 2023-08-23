import React from "react";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../context/Contextt";

const AdminDashboard=()=>{
    const [auth]=useAuth();
    return(
        <>
        {/* used grid system */}
            <div className="container-fluid adminDiv m-3 p-3">
                <div className="row">
                <div className="col-md-3 "><AdminMenu/></div>
                <div className="col-md-6">
                <div className="card w-75 p-3 borderfor">
                    <h3> Admin Name : {auth?.user?.name}</h3>
                    <h3> Admin Email : {auth?.user?.email}</h3>
                    <h3> Admin Contact : {auth?.user?.phone}</h3>
                </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;