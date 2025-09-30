import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';
import ProductCard from './ProductCard';

const Products = ({fetchQuantity}) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://shreehari-react.onrender.com/api/products') 
      .then(res => res.json())
      .then(data => {
        setProducts(data.products); 
        console.log(data.products);
        setLoading(false);
      })

      .catch(err => {
        console.error("Error fetching products:", err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const handleProductClick = (product) => {
    navigate(`/products/${product._id}`, { state: { product } }); // use _id instead of id
  };

  if (loading) return <p></p>;

  return (
    <div className="product-list">
      {products.length > 0 ? (
        products
          .filter(p => p.name && p.price > 0 && p.image)
          .map((prod, index) => (
            <div key={prod._id || index} onClick={() => handleProductClick(prod)}>
              <ProductCard product={prod} fetchQuantity={fetchQuantity} />
            </div>
          ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default Products;
