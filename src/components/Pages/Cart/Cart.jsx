import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./cart.css";
import { useNavigate } from "react-router-dom";


const Cart = ({ fetchQuantity }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {

        const fetchCart = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to access your cart.");
                return;
            }


            try {
                const response = await fetch("http://localhost:3000/api/cart", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                fetchQuantity()

                setCartItems(data.items || []);
                console.log(cartItems);
            } catch (error) {
                console.error("Error fetching cart:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [fetchQuantity]);

    const getTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    const removeItem = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You are about to delete this item from the cart.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch(`http://localhost:3000/api/cart/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await res.json();
                if (res.ok) {
                    setCartItems(result.cart.items);
                    fetchQuantity()
                    toast.success("Item removed from cart.");
                } else {
                    toast.error(result.msg || "Failed to delete item.");
                }
            } catch (err) {
                console.error(err);
                toast.error("Server error.");
            }
        }
    };

    const updateQty = async (id, change) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:3000/api/cart/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ itemId: id, change }),
            });

            const result = await res.json();
            if (res.ok) {
                setCartItems(result.items);
                fetchQuantity()
                toast.success("Quantity updated.");
            } else {
                toast.error(result.msg || "Failed to update quantity.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Can't reduce to Zero.");
        }
    };

    if (loading) return <p>Loading cart...</p>;

    if (cartItems.length === 0) {
        return <p className="empty-msg">Your cart is empty 🛒</p>;
    }

    return (
        <>
            <ToastContainer position="bottom-right"
                autoClose={1500}  // time in milliseconds (1.5 seconds)
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
            />
            {cartItems.map(item => (
                <div className="cart-item" key={item._id}>
                    <div className="cart-left">
                        <img src={item.image} alt={item.name} />
                        <div className="cart-info">
                            <h2>{item.name}</h2>
                            <p>Only few left in stock</p>
                            <p><strong>Size:</strong> Default</p>
                            <p><strong>Delivery:</strong> Eligible for Free Delivery</p>
                            <p className="remove-btns" onClick={() => removeItem(item._id)}>
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

            <div className="total"><strong>Grand Total: ₹{getTotal()}</strong></div>
            <div className="buy-btn-container">
                <div className="border-animate">
                    <button
                        className="buy-btn"
                        onClick={() => navigate("/buy", { state: { cartItems } })}
                    >
                        Buy Cart
                    </button>
                </div>
            </div>
        </>
    );
};

export default Cart;

