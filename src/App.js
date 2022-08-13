import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Page/Home/Home';
import Navbar from './Page/Navbar/Navbar';
import Order from './Page/Order/Order';
import Blog from './Page/Blog/Blog'
import Login from './Page/Login/Login'
import Products from './Page/Products/Products';
import ProductsDetails from './Page/Products/ProductsDetails';
import BlogDetails from './Page/Blog/BlogDetails';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Page/Footer/Footer';
import SignUp from './SignUp/SignUp';
import Dashboard from './Dashboard/Dashboard';
import RequireAuth from './RequireAuth/RequireAuth';
import AddProduct from './Dashboard/AddProduct';
import MyProfile from './Dashboard/MyProfile';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/order' element={<RequireAuth>
        <Order></Order>
      </RequireAuth>}></Route>
      <Route path='/blog' element={<Blog></Blog>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/products' element={<Products></Products>}></Route>
      <Route path='/productsDetails/:id' element={<ProductsDetails></ProductsDetails>}></Route>
      <Route path='/blogDetails/:id' element={<BlogDetails></BlogDetails>}></Route>
      <Route path='/signUp' element={<SignUp></SignUp>}></Route>
      <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
      <Route index element={<MyProfile></MyProfile>}></Route>
      <Route path='addProduct' element={<AddProduct></AddProduct>}></Route>
      </Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer/>
    </div>
  );
}

export default App;
