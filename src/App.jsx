import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Header/Navbar';
import Home from './components/Pages/Homepage/Home';
import About from './components/Pages/About/About';
import Products from './components/Pages/Products/Products';
import Contact from './components//Pages/Contact/Contact';
import Login from './components/Pages/Authentication/Login';
import Register from './components/Pages/Authentication/Register';
import Body from './components/Pages/Body';

function App() {
  return (
    <Router>
      <Navbar />
      <Body/>
      
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
