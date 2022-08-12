import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Page/Home/Home';
import Navbar from './Page/Navbar/Navbar';
import Order from './Page/Order/Order';
import Blog from './Page/Blog/Blog'
import Login from './Page/Login/Login'
import Products from './Page/Products/Products';
import ProductsDetails from './Page/Products/ProductsDetails';

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
      </Routes>
    </div>
  );
}

export default App;
