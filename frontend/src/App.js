
import './App.css';
import Footer from './components/Footer';
import Header from './components/header';
import Home from './pages/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useState } from 'react';
import ProductDetail from './pages/ProductDetail';
import {ToastContainer }from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';

function App() {
  const [cartItems,setCartitems]=useState([]);
  return (
    <div className="App">
        <Router>
          <div>
          <ToastContainer position="top-center" theme="dark" />
          <Header cartItems={cartItems}/>
            <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/search' element={<Home/>}/>
                    <Route path='/product/:id' element={<ProductDetail cartItems={cartItems} setCartitems={setCartitems}/>}/>
                    <Route path='/cart' element={<Cart cartItems={cartItems} setCartitems={setCartitems}/>}/>
            </Routes>
          </div>
        </Router>
      <Footer/>
      
    </div>
  );
}

export default App;
