import React from "react";
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/Contextt";

const Dashboard=()=>{
    const [auth]=useAuth();
    return(
        <>
        {/* used grid system */}
            <div className="container-fluid adminDiv m-3 p-3">
                <div className="row">
                <div className="col-md-3 "><UserMenu/></div>
                <div className="col-md-6">
                <div className="card w-75 p-3 borderfor">
                    <h3>{auth?.user?.name}</h3>
                    <h3>{auth?.user?.email}</h3>
                    <h3>{auth?.user?.address}</h3>
                </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;