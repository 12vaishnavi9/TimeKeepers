import React from "react";
import AdminMenu from "./AdminMenu";

const CreateCategory=()=>{
    return(
        <>
           <div className="container-fluid adminDiv m-3 p-3">
                <div className="row">
                <div className="col-md-3 "><AdminMenu/></div>
                <div className="col-md-6">
                <div className="card w-75 p-3 borderfor">
                    <h3>all users</h3>
                </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default CreateCategory;