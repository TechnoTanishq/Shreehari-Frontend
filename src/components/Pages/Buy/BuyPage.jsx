import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./BuyPage.css";


const BuyPage = () => {
    const location = useLocation();
    const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
    const [delivery, setDelivery] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        landmark: "",
        pincode: "",
        mobile: ""
    });

    const updateQty = (id, change) => {
        const updated = cartItems.map(item =>
            item._id === id
                ? { ...item, quantity: Math.max(1, item.quantity + change) }
                : item
        );
        setCartItems(updated);
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item._id !== id));
    };

    const getSubtotal = () =>
        cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const getGST = () => (getSubtotal() * 0.18).toFixed(2);
    const getTotal = () => (getSubtotal() + parseFloat(getGST())).toFixed(2);

    const handleChange = (e) => {
        setDelivery({ ...delivery, [e.target.name]: e.target.value });
    };

    const handlePayment = () => {
        const { firstName, lastName, email, address, city, landmark, pincode, mobile } = delivery;
        if (!firstName || !lastName || !email || !address || !city || !landmark || !pincode || !mobile) {
            alert("Please fill all required delivery fields.");
            return;
        }
        alert("Proceeding to payment gateway...");
    };

    
    return (
        <div className="buy-page">
            <h2>Checkout</h2>

            <section className="delivery-form">
                <h3>Delivery Details</h3>
                <div className="form-grid">
                    <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
                    <input type="text" name="city" placeholder="City" onChange={handleChange} required />
                    <input type="text" name="landmark" placeholder="Landmark" onChange={handleChange} required />
                    <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} required />
                </div>
                <textarea name="address" placeholder="Full Address" onChange={handleChange} required />
            </section>

            <section className="cart-summary">
                <h3>Your Items</h3>
                {cartItems.map((item) => (
                    <div className="cart-item" key={item._id}>
                        <div className="cart-left">
                            <img src={item.image} alt={item.name} />
                            <div className="cart-info">
                                <h2>{item.name}</h2>
                                <p>Only few left in stock</p>
                                <p><strong>Size:</strong> Default</p>
                                <p><strong>Delivery:</strong> Eligible for Free Delivery</p>
                                <p className="remove-btn" onClick={() => removeItem(item._id)}>
                                    <i className="fa fa-trash"></i> Delete
                                </p>
                            </div>
                        </div>
                        <div className="cart-right">
                            <div className="price">₹{item.price}</div>
                            <div className="qty-controls">
                                <button onClick={() => updateQty(item._id, -1)}>-</button>
                                {item.quantity}
                                <button onClick={() => updateQty(item._id, 1)}>+</button>
                            </div>
                            <div>Total: ₹{(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                    </div>
                ))}

                <div className="billing-summary">
                    <p>Subtotal: ₹{getSubtotal().toFixed(2)}</p>
                    <p>GST (18%): ₹{getGST()}</p>
                    <h3 id="grand-total">Grand Total: ₹{getTotal()}</h3>
                </div>

                <div className="payment-button-container">
                    <button className="payment-btn" onClick={handlePayment}>
                        Make Payment
                    </button>
                </div>
            </section>
        </div>
    );
};

export default BuyPage;
