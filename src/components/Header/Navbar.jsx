
import React, { useState, useEffect } from 'react';
import "./navbar.css";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({cartQuantity}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [userName, setUserName] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        if (parsed?.name) {
          setUserName(parsed.name);
        }
      } catch (err) {
        console.error("Invalid user data" + err);
      }
    }
  }, []);

  const toggleShowDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  const toggleShowSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserName(null);
    navigate("/"); // redirect to home
    window.location.reload(); // refresh to reflect logout
  };

  return (
    <div className="navbar">
      <div className="hamburg-menu" onClick={toggleShowSidebar}>
        <img src="/assets/menus.png" height="30rem" alt="menu" />
      </div>

      <Link to="/" className="logo">
        <img src="/assets/Logo.png" alt="SHREEHARI" />
      </Link>

      <div className="search-bar">
        <input type="text" placeholder="Search for jewellery..." />
        <button>
          <img
            className="search-icon"
            src="/assets/search.png"
            alt="Search"
            height="15px"
          />
        </button>
      </div>

      <div className="right">
        <Link to="/" className="sub-container">
          <img className="right-icon" src="assets/home.png" alt="Home" />
          <span className="right-icon-title">Home</span>
        </Link>


        <Link to={"/products"}
          className="sub-container product-container"
          onClick={toggleShowDropDown}
        >
          <img className="right-icon" src="assets/package.png" alt="Products" />
          <span className="right-icon-title">Products</span>
          {showDropDown && (
            <div className="dropdown-product-list">
              <span className="dropdown-list-title">Necklaces</span>
              <span className="dropdown-list-title">Earrings</span>
              <span className="dropdown-list-title">Bangles</span>
              <span className="dropdown-list-title">Rings</span>
            </div>
          )}
        </Link>

        <Link to="/about-us" className="sub-container">
          <img className="right-icon" src="assets/information-button.png" alt="about us" />
          <span className="right-icon-title">About Us</span>
        </Link>

        <Link to="/cart" className="sub-container cart-container cart-container1">
          <img className="right-icon" src="assets/cart.png" alt="Cart" />
          <span className="right-icon-title">Cart</span>
          <span className="add-product-counts">{cartQuantity}</span>
        </Link>

        <div className="sub-container profile-container">
          <img className="right-icon" src="assets/profile.png" alt="Profile" />
          <span className="right-icon-title">
            {userName ? `Hi, ${userName.split(" ")[0]}` : "Profile"}
          </span>
          <div className="profile-dropdown-list">
            {!userName ? (
              <>
                <Link to="/login" className="profile-dropdown-list-title">
                  <i className="fa-solid fa-right-to-bracket"></i>
                  <span className="text">Login</span>
                </Link>
                <Link to="/register" className="profile-dropdown-list-title">
                  <i className="fa-solid fa-user-plus"></i>
                  <span className="text2">SignUp</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="profile-dropdown-list-title">
                  <i className="fa-solid fa-user"></i>
                  <span className="text">My Profile</span>
                </Link>
                <div className="profile-dropdown-list-title" onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <span className="text">Logout</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Responsive sidebar */}
      <div className={`no-sidebar other-sidebar ${showSidebar ? "sidebar" : ""}`}>
        <div className="no-icon close-icon" onClick={toggleShowSidebar}>
          <img src="/assets/close.png" alt="Close" height="23rem" />
        </div>

        <Link to="/" className="sub-container">
          <img className="right-icon" src="assets/home.png" alt="Home" />
          <span className="right-icon-title">Home</span>
        </Link>

        <div className="sub-container product-container" onClick={toggleShowDropDown}>
          <img className="right-icon" src="assets/package.png" alt="Products" />
          <span className="right-icon-title">Products</span>
        </div>

        {showDropDown && (
          <div className="bottom-product-list show">
            <span className="dropdown-list-title">Necklaces</span>
            <span className="dropdown-list-title">Bangles</span>
            <span className="dropdown-list-title">Rings</span>
            <span className="dropdown-list-title">Earrings</span>
          </div>
        )}

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
  );
};

export default Navbar;
