import React, { useEffect } from 'react';
import "./Profile.css";
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            alert("Please log in to view your profile.");
            navigate("/login");
        } else {
            fetch("https://shreehari-react.onrender.com/api/user/me", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    document.getElementById("user-name").textContent = data.name;
                    document.getElementById("user-email").textContent = data.email;
                })
                .catch(err => {
                    console.error("Error loading profile:", err);
                    alert("Session expired. Please log in again.");
                    localStorage.removeItem("token");
                    navigate("/login");
                });
        }
    }, [token, navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        window.location.reload(); // refresh to reflect logout
    };

    return (
        <section className="profile-section">
            <div className="profile-card">
                <img src="/assets/profile-user.png" alt="Profile" className="profile-pic" />
                <h2 id="user-name">Loading...</h2>
                <p id="user-email">...</p>
                <button className="edit-btn">Edit Profile</button>
            </div>

            <div className="profile-options">
                <Link to="/my-orders" className="profile-option"><i className="fa fa-box"></i> My Orders</Link>
                <Link to="/cart" className="profile-option"><i className="fa fa-cart-shopping"></i> My Cart</Link>
                <Link to="/address" className="profile-option"><i className="fa fa-map-marker-alt"></i> Address Book</Link>
                <Link to="/change-password" className="profile-option"><i className="fa fa-key"></i> Change Password</Link>
                <button onClick={logout} className="profile-option logout"><i className="fa fa-sign-out-alt"></i> Logout</button>
            </div>
        </section>
    );
};

export default Profile;
