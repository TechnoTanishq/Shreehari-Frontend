// src/pages/admin/ViewAllProducts.jsx
import React, { useEffect, useState } from 'react';
import './viewallproducts.css';
import ProductCard from './ProductCard';

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all products');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(category)
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
        console.log(data.products)
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setProducts([]);
        setLoading(false);
      });
  }, [category,]);



  return (
    <div className="view-products-container">
      <h2 className="title">ALL PRODUCTS</h2>
      <div className="select-category">
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value.toLowerCase())}>
          <option value="all products">All Products</option>
          <option value="necklace">Necklace</option>
          <option value="bracelet">Bracelet</option>
          <option value="ring">Ring</option>
          <option value="earring">Earring</option>
          <option value="pendant">Pendant</option>
          <option value="anklet">Anklet</option>
          <option value="nosepin">Nosepin</option>
          <option value="bangle">Bangle</option>
          <option value="mangalsutra">Mangalsutra</option>
        </select>
      </div>



      {loading ? `Loading products...` :
        products.map(product => (
          product.stock > 0 && (product.category === category || category === 'all products') ?
            <ProductCard
              product={product}
              key={product._id}
            />
            : ''
        ))
      }



    </div>
  );
};

export default ViewAllProducts;


