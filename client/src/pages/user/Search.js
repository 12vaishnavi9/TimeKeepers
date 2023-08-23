import React, { useState } from "react";
import { useSearch } from "../../context/Search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/Cart";
import { ToastContainer, toast } from 'react-toastify';

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  // Function to handle adding an item to the cart
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    toast.success("Item Added to Cart");
  };

  return (
    <>
      <div className="container searchjs">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap">
            {values?.results.map((p) => (
              <div
                key={p._id}
                className="card m-2 mt-5 searched-products"
                style={{ width: "18rem" }}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">₹ {p.price}</p>
                  <button
                    className="btn blackButton ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn blackButton ms-1"
                    onClick={() => handleAddToCart(p)} // Call the handleAddToCart function with the product
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
