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

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/order' element={<Order></Order>}></Route>
      <Route path='/blog' element={<Blog></Blog>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/products' element={<Products></Products>}></Route>
      <Route path='/productsDetails/:id' element={<ProductsDetails></ProductsDetails>}></Route>
      <Route path='/blogDetails/:id' element={<BlogDetails></BlogDetails>}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer/>
    </div>
  );
}

export default App;
