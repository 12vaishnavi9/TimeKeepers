import React from "react";

const CategoryForm=({handleSubmit,value,setValue})=>{//these values are expected as props
    return(
        <>
            <form onSubmit={handleSubmit} className="category-form">
  <div className="mb-3 div1form">
    <input type="text" class="form-control" placeholder="Enter new category" 
    value={value} onChange={(e)=>setValue(e.target.value)}/>
  </div>
  <button type="submit" className="btn btn-primary btn-form" style={{ backgroundColor: 'black', color: 'white' }}>Submit</button>
</form>
        </>
    )
}

export default CategoryForm;

