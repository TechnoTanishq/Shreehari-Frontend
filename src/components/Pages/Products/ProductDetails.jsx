import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './ProductDetails.css';
import { useNavigate } from 'react-router-dom';

const ProductDetails = ({fetchQuantity}) => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [mainImage, setMainImage] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  const navigate = useNavigate();

  const getMainImage = (prod) => {
    if (prod.image?.startsWith("/uploads/")) {
      return `https://shreehari-react.onrender.com${product.image}`
    }
    if (Array.isArray(prod.images) && prod.images.length > 0) return prod.images[0];
    return prod.image || '';
  };

  useEffect(() => {
    if (!product) {
      fetch('https://shreehari-react.onrender.com/api/products')
        .then(res => res.json())
        .then(data => {
          const found = data.find(p => p._id === id || p.id === id);
          if (found) {
            setProduct(found);
            setMainImage(getMainImage(found));
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setMainImage(getMainImage(product));
    }
  }, [id, product]);

  useEffect(() => {
    const checkIfInCart = async () => {
      const token = localStorage.getItem("token");
      if (!token || !product) return;

      try {
        const res = await fetch("https://shreehari-react.onrender.com/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const found = data.items?.find(item =>
          item.productId === product._id || item.productId === product.id
        );
        if (found) setAddedToCart(true);
      } catch (err) {
        console.error("Error checking cart:", err);
      }
    };

    checkIfInCart();
  }, [product]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add to cart.");
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch("https://shreehari-react.onrender.com/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product._id || product.id,
          name: product.name,
          price: product.price,
          image: mainImage,
          quantity: 1
        })
      });

      const result = await res.json();
      if (res.ok) {
        setAddedToCart(true);
        fetchQuantity()
      } else {
        alert(result.msg || "Failed to add to cart.");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Something went wrong.");
    }
  };

   const handleBuyNow = () => {
    if (!product) return;
    navigate("/buy", {
      state: {
        cartItems: [{
          _id: product._id || product.id,
          name: product.name,
          price: product.price,
          image: mainImage,
          quantity: 1
        }]
      }
    });
  };

  const handlePincodeCheck = async () => {
    if (!pincode || pincode.length !== 6) {
      setPincodeResult({
        available: false,
        message: 'Please enter a valid 6-digit pincode.'
      });
      return;
    }

    try {
      setPincodeResult({ message: "Loading..." });
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();
      const postOffice = data[0]?.PostOffice?.[0];

      if (postOffice) {
        setPincodeResult({
          available: true,
          message: `✅ Delivery available to ${postOffice.District}, ${postOffice.State}.`
        });
      } else {
        setPincodeResult({
          available: false,
          message: '❌ Delivery not available to this pincode.'
        });
      }
    } catch (err) {
      console.error("Pincode API Error:", err);
      setPincodeResult({
        available: false,
        message: '❌ Error checking pincode. Try again.'
      });
    }
  };

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-details-wrapper">
      <div className="product-image-container">
        <img src={mainImage} alt={product.name} className="main-image" />
        {product.badge && <span className="badge">{product.badge}</span>}
      </div>

      <div className="product-info-container">
        <h2>{product.name}</h2>
        <p className="brand">by <strong>SHRIHARI</strong></p>

        <div className="rating">
          {"★".repeat(Math.floor(product.rating || 0))}{"☆".repeat(5 - Math.floor(product.rating || 0))}
          <span>({product.reviews || 0})</span>
        </div>

        <div className="pricing">
          <span className="price">₹{product.price}</span>
          {product.oldPrice && (
            <span className="original-price">₹{product.oldPrice}</span>
          )}
        </div>

        {product.stock <= 5 && (
          <p className="stock-alert">Only {product.stock} left!</p>
        )}

        <div className="pincode-check">
          <label>Check Delivery:</label>
          <div className="pincode-input-group">
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={e => setPincode(e.target.value)}
              maxLength="6"
            />
            <button onClick={handlePincodeCheck}>Check</button>
          </div>
          {pincodeResult && (
            <p className={`pincode-msg ${pincodeResult.available ? 'success' : 'error'}`}>
              {pincodeResult.message}
            </p>
          )}
        </div>

        <div className="action-buttons">
          <button className="btn buy-now" onClick={handleBuyNow}>Buy Now</button>
          <button
            className={`btn add-cart ${addedToCart ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={addedToCart}
          >
            {addedToCart ? 'Added to Cart ✔️' : 'Add to Cart'}
          </button>
        </div>

        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'description' && (
            <p className="description">
              {product.description || `This is a demo product description for ${product.name}.`}
            </p>
          )}

          {activeTab === 'details' && product.details && Array.isArray(product.details) && (
            <ul className="details-list">
              {product.details.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
