import React, { useState } from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const toggleShowDropDown = () => {
    setShowDropDown(prev => !prev)
    if (showDropDown) {
      document.querySelector(".product-container").styles = 'padding-bottom: 0rem';
    }
  }

  const toggleShowSidebar = () => {
    setShowSidebar(prev => !prev);
  }

  return (
    <>
      <div className="navbar">
        <div className="hamburg-menu" onClick={() => toggleShowSidebar()}>
          <img src="/assets/menus.png" height={"30rem"} alt="!" />
        </div>

        <Link to="/" class="logo">
          <img src="/assets/Logo.png" alt="SHREEHARI" />
        </Link>

        <div class="search-bar">
          <input type="text" placeholder="Search for jewellery..." />
          <button>
            <img className='search-icon' src="/assets/search.png" alt="Search" height={"15px"} />
          </button>
        </div>

        <div className="right">
          <Link to="/" className="sub-container">
            <img className="right-icon" src="assets/home.png" alt="Home" />
            <span className="right-icon-title">Home</span>
          </Link>

          <Link to="/products" className="sub-container product-container">
            <img className="right-icon" src="assets/package.png" alt="Collection" />
            <span className="right-icon-title">Products</span>
            <div className="dropdown-product-list">
              <span className='dropdown-list-title'>Necklaces</span>
              <span className='dropdown-list-title'>Earrings</span>
              <span className='dropdown-list-title'>Bangles</span>
              <span className='dropdown-list-title'>Rings</span>
            </div>
          </Link>

          <Link to="/wishlist" className="sub-container">
            <img className="right-icon" src="assets/wishlist.png" alt="Wishlist" />
            <span className="right-icon-title">Wishlist</span>
          </Link>

          <Link to="/profile" className="sub-container">
            <img className="right-icon" src="assets/profile.png" alt="Profile" />
            <span className="right-icon-title">Profile</span>
          </Link>

          <Link to="/cart" className="sub-container cart-container cart-container1">
            <img className="right-icon" src="assets/cart.png" alt="Cart" />
            <span className="right-icon-title">Cart</span>
            <span className="add-product-counts">0</span>
          </Link>
        </div>

        <div className="right2">
          <Link to="/products" className="sub-container2">
            <img className="right-icon2" src="assets/package.png" alt="Collection" />
            <span className="right-icon-title2">Products</span>
            <div className="dropdown-product-list">
              <span className='dropdown-list-title'>Necklaces</span>
              <span className='dropdown-list-title'>Earrings</span>
              <span className='dropdown-list-title'>Bangles</span>
              <span className='dropdown-list-title'>Rings</span>
            </div>
          </Link>
          <Link to="/cart" className="sub-container2">
            <img className="right-icon2" src="assets/cart.png" alt="Cart" />
            <span className="right-icon-title2">Cart</span>
            <span className="add-product-counts">0</span>
          </Link>
        </div>

        <div className={`no-sidebar other-sidebar ${showSidebar ? "sidebar" : ""}`}>
          <div className={`no-icon ${showSidebar ? "close-icon" : ""}`} onClick={() => toggleShowSidebar()}>
            <img src="/assets/close.png" alt="Close" height={"23rem"} />
          </div>

          <Link to="/" className="sub-container">
            <img className="right-icon" src="assets/home.png" alt="Home" />
            <span className="right-icon-title">Home</span>
          </Link>

          <Link to="/products" className="sub-container product-container" onClick={() => toggleShowDropDown()}>
            <img className="right-icon" src="assets/package.png" alt="Collection" />
            <span className="right-icon-title">Products</span>

          </Link>

          <div className={`bottom-product-list ${showDropDown ? "show" : ""}`}>
            <span className='dropdown-list-title'>Necklaces</span>
            <span className='dropdown-list-title'>Bangles</span>
            <span className='dropdown-list-title'>Rings</span>
            <span className='dropdown-list-title'>Earrings</span>
          </div>

          <Link to="/wishlist" className="sub-container">
            <img className="right-icon" src="assets/wishlist.png" alt="Wishlist" />
            <span className="right-icon-title">Wishlist</span>
          </Link>

          <Link to="/cart" className="sub-container cart-container">
            <img className="right-icon" src="assets/cart.png" alt="Cart" />
            <span className="right-icon-title">Cart</span>
            <span className="add-product-counts">0</span>
          </Link>

          <Link to="/profile" className="sub-container">
            <img className="right-icon" src="assets/profile.png" alt="Profile" />
            <span className="right-icon-title">Profile</span>
          </Link>
        </div>

      </div>
    </>
  )
}

export default Navbar