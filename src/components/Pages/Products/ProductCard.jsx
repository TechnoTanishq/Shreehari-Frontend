import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../../../utils/api';
import { Star, StarHalf, Star as StarOutline, Heart } from 'lucide-react';
import './Products.css';

const ProductCard = ({ product, fetchQuantity }) => {
  const { _id, name, price, oldPrice, rating, reviews, badge, stock } = product;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const handleAddtoCart = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isAdded) return; // prevent re-adding

    const result = await addToCart(product);
    if (result.error) {
      alert(result.error);
    } else {
      fetchQuantity()
      setIsAdded(true); // update button state
    }
  };


  const handleAddtoWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsWishlisted(prev => !prev);
  };

  return (
    <div className="product-card">
      {badge && <span className="badge">{badge}</span>}

      <div className="wishlist-icon" onClick={handleAddtoWishlist}>
        <Heart
          size={20}
          fill={isWishlisted ? '#e91e63' : 'none'}
          stroke="#e91e63"
        />
      </div>

      <Link to={`/products/${_id}`} className='product-card-link'>
        <div className="product-img-wrapper">
          <img
            src={
              product.image?.startsWith("/uploads/")
                ? `https://shreehari-react.onrender.com${product.image}`
                : product.image
            }
            alt={product.name}
            className="product-img"
          />
        </div>
      </Link>

      <div className="product-info">
        <h3 className="product-name">{name}</h3>

        <div className="product-rating">
          {Array.from({ length: fullStars }).map((_, i) => (
            <Star key={`full-${i}`} size={16} fill="#ffc107" stroke="#ffc107" />
          ))}
          {hasHalfStar && <StarHalf size={16} fill="#ffc107" stroke="#ffc107" />}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <StarOutline key={`empty-${i}`} size={16} fill="none" stroke="#ffc107" />
          ))}
          <span className="review-count">({reviews})</span>
        </div>

        <div className="product-price">
          <span className="current-price">₹{price}</span>
          {oldPrice && <span className="old-price">₹{oldPrice}</span>}
        </div>

        {stock && (
          <div className={`stock-info ${stock <= 5 ? 'low-stock' : ''}`}>
            Only {stock} left!
          </div>
        )}

        <button
          className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
          onClick={handleAddtoCart}
          disabled={isAdded}
        >
          {isAdded ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
