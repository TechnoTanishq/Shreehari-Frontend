// import React from 'react'
// import "./auth.css";
// import { Link, useNavigate } from 'react-router-dom';


// const Register = () => {

//   const navigate = useNavigate();

//   const handleClose = () => {
//     navigate('/');
//   }

//   return (
//     <>
//       <section className="auth-body">
//         <div className="close-icon" onClick={handleClose}>
//             <img src="/assets/close.png" alt="Close" height={"23rem"} />
//           </div>
//         <div class="auth-container">
//           <div class="auth-card">
//             <h2 class="auth-title">Create Account</h2>
//             <p class="auth-subtitle">Join the Shrihari family 💎</p>

//             <form class="auth-form">
//               <input type="text" placeholder="Full Name" required />
//               <input type="email" placeholder="Email" required />
//               <input type="password" placeholder="Password" required />
//               <button type="submit" class="auth-btn">Sign Up</button>
//               <p class="auth-bottom-text">Already have an account? <Link to="/login">Login</Link></p>
//             </form>
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }

// export default Register
import React, { useState } from 'react';
import axios from 'axios';
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleClose = () => {
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type === "email" ? "email" : e.target.type === "password" ? "password" : "name"]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3000/api/auth/signup', formData);
      console.log('User registered:', res.data);

      // optionally store token
      // localStorage.setItem("token", res.data.token);

      navigate('/login'); // redirect to login
    } catch (err) {
      console.error('Signup failed:', err);
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <>
      <section className="auth-body">
        <div className="close-icon" onClick={handleClose}>
          <img src="/assets/close.png" alt="Close" height={"23rem"} />
        </div>

        <div className="auth-container">
          <div className="auth-card">
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join the Shrihari family 💎</p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="auth-btn">Sign Up</button>
              {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
              <p className="auth-bottom-text">Already have an account? <Link to="/login">Login</Link></p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
