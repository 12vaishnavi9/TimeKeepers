import React,{useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Contextt";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import SearchInput from "./Forms/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart,setCart]=useCart();
  const categories=useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    localStorage.removeItem("auth");
  };



  return (
    <nav className="navbar fixed-top">
      <div className="divv">
        <div className="nav-header for-search">
          <NavLink to="/">SHOP</NavLink>
          </div>
          <div className="searchinput">
         <SearchInput/>
        </div>
        {/* <div className="nav-header">
        </div> */}
        <div className="nav-center">
          <ul className="nav-links">
            <li><NavLink to="/">Home</NavLink></li>
            <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </NavLink>
                <ul className="dropdown-menu" style={{width:"180px",backgroundColor:"black"}}>
                  {/* <li>
                    <NavLink className="dropdown-item" to={"/categories"}>
                      All Categories
                    </NavLink>
                  </li> */}
                  {categories?.map((c) => (
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>


            {!auth.user ? (
              <>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>DASHBOARD</NavLink>
                </li>
                <li>
                  <NavLink onClick={handleLogout} to="/login">Logout</NavLink>
                </li>
              </>
            )}
            <li>
            {/* <Badge count={0} showZero className="custom-badge"> */}
            <NavLink to="/cart" className="cart">CART({cart?.length})</NavLink>
    {/* </Badge> */}
    </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

