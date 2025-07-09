import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Header/Navbar';
import About from './components/Pages/About/About';
import Products from './components/Pages/Products/Products';
import ProductPage from './components/Pages/Products/ProductPage';
import Contact from './components/Pages/Contact/Contact';
import Login from './components/Pages/Authentication/Login';
import Register from './components/Pages/Authentication/Register';
import Body from './components/Pages/Body';
import Footer from './components/Footer/Footer';
import Cart from './components/Pages/Cart/cart';
import Profile from './components/Pages/Profile/Profile';
import Admin from './components/Admin/Admin'; 
import BuyPage from './components/Pages/Buy/BuyPage';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

function AppContent() {
  const location = useLocation();
  const path = location.pathname;

  const isAdminPath = path.startsWith('/admin');

  const [cartQuantity, setCartQuantity] = useState(0);
  const token = localStorage.getItem("token");

  const fetchQuantity = () => {
    axios.get('http://localhost:3000/api/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        console.log(res.data.items.length)
        setCartQuantity(res.data.items.length)
        console.log(cartQuantity)
      })
      .catch(err => console.error('Error fetching cart:', err));
  }

  useEffect(() => {
    fetchQuantity();
  }, [])

  if (isAdminPath) {
    return (
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    );
  }

  // ✅ Normal user site rendering
  const isMainPage = path === '/' || path === '/login' || path === '/register';
  const showLoginModal = path === '/login';
  const showRegisterModal = path === '/register';

  return (
    <>
      <Navbar cartQuantity={cartQuantity}  />
      {isMainPage && <Body />}
      {showLoginModal && <Login />}
      {showRegisterModal && <Register />}

      <Routes>
        <Route path="/about-us" element={<About />} />
        <Route path="/products" element={<Products fetchQuantity={fetchQuantity} />}  />
        <Route path="/products/:id" element={<ProductPage fetchQuantity={fetchQuantity} />}  />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart fetchQuantity={fetchQuantity} />}  />
         <Route path="/buy" element={<BuyPage />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
