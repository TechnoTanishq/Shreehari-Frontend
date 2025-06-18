import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Category from './components/Category';

function App() {
  return (
    <Router>
      <Navbar />
      <Category/>
      <Routes>
        <Route path='/' element={Home} />
        <Route path='/about' element={About} />
        <Route path='/products' element={Products} />
        <Route path='/contact' element={Contact} />
        <Route path='/login' element={Login} />
        <Route path='/register' element={Register} />
      </Routes>
    </Router>
  );
}

export default App;
