import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes,Route} from "react-router-dom";
import Homepage from './pages/Homepage';
import Contact from './pages/Contact';
import Pagenotfound from './pages/Pagenotfound';
import Header from './components/Layout/Header';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import Privatedash from './Routes/Privatedash';
import ForgotPass from './pages/Auth/ForgotPass';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './pages/Admin/AdminRoute';
import { useAuth } from './context/Contextt';
import { Outlet } from 'react-router-dom';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import UpdateViewProduct from './pages/Admin/UpdateViewProduct';
import Search from './pages/user/Search';
import MoreDetails from './pages/user/MoreDetails';
import Categorydropdown from './pages/user/Categorydropdown';
import CategoryProduct from './pages/user/CategoryProduct';
import Cart from './pages/user/Cart';
import AdminOrders from './pages/Admin/AdminOrders';




function App() {
  const [auth,setAuth]=useAuth();
  return (
   <>
   <Header/>
   <Routes>
     <Route path="/" element={<Homepage/>}/>
     <Route path="/search" element={<Search/>}/>
     {/* <Route path="/categories" element={<Categorydropdown/>}/> */}
     <Route path="/product/:slug" element={<MoreDetails/>}/>
     <Route path="/category/:slug" element={<CategoryProduct/>}/>
     <Route path="/cart" element={<Cart/>}/>
   <Route path="/dashboard" element={<Privatedash/>}>
      <Route path="user" element={<Dashboard/>}/>
      <Route path="user/orders" element={<Orders/>}/>
      <Route path="user/profile" element={<Profile/>}/>
    </Route>
    <Route path="/dashboard" element={<AdminRoute/>}>
      <Route path="admin" element={<AdminDashboard/>}/>
      <Route path="admin/create-category" element={<CreateCategory/>}/>
      <Route path="admin/create-product" element={<CreateProduct/>}/>
      <Route path="admin/product/:slug" element={<UpdateViewProduct/>}/>
      <Route path="admin/products" element={<Products/>}/>
      <Route path="admin/users" element={<Users/>}/>
      <Route path="admin/orders" element={<AdminOrders/>}/>
    </Route>

    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/forgot-password" element={<ForgotPass/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route element={<Pagenotfound/>}/>
   </Routes>
   <ToastContainer /> 
   </>
  );
}

export default App;
