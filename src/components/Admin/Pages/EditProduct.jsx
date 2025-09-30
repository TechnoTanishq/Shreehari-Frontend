import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const EditProduct = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [productDetails, setProductDetails] = useState(['']);
  const [oldPrice, setOldPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [badge, setBadge] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const location = useLocation();
  const product = location.state.product;

  const navigate = useNavigate();

  useEffect(() => {
    console.log(product.badge.toLowerCase());
    setId(product._id || '');
    setName(product.name || '');
    setDescription(product.description || '');
    setProductDetails(product.details || ['']);
    setOldPrice(product.oldPrice || '');
    setNewPrice(product.price || '');
    setCategory(product.category || '');
    setStock(product.stock || '');
    setBadge(product.badge.toLowerCase() || '');
    setImagePreview(product.image || null)
  }, []);

  const handleDetailChange = (index, value) => {
    const updatedDetails = [...productDetails];
    updatedDetails[index] = value;
    setProductDetails(updatedDetails);
  };

  const addMoreDetail = () => setProductDetails([...productDetails, '']);
  const removeDetail = (index) => {
    const updatedDetails = [...productDetails];
    updatedDetails.splice(index, 1);
    setProductDetails(updatedDetails);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Product name is required';
    if (!description.trim()) newErrors.description = 'Product description is required';
    if (productDetails.some((d) => !d.trim())) newErrors.details = 'All details must be filled or removed';
    if (!oldPrice) newErrors.oldPrice = 'Old price is required';
    if (!newPrice) newErrors.newPrice = 'New price is required';
    if (!category) newErrors.category = 'Please select a category';
    if (!stock) newErrors.stock = 'Stock is required';
    // if (!badge) newErrors.badge = 'Please select a badge';
    if (!image && !imagePreview) newErrors.image = 'Product image is required';
    if (parseFloat(oldPrice) <= parseFloat(newPrice)) newErrors.oldPrice = 'Old price must be greater than new price';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('details', JSON.stringify(productDetails.filter(d => d.trim())));
      formData.append('oldPrice', oldPrice);
      formData.append('newPrice', newPrice);
      formData.append('category', category);
      formData.append('stock', stock);
      formData.append('badge', badge);

      if (image) {
        formData.append('image', image);
      } else {
        formData.append('existingImage', imagePreview); // Use existing image if no new upload
      }

      await axios.put(`https://shreehari-react.onrender.com/api/products/update/${product._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success("✅ Product updated successfully!");
      setTimeout(() => {
        navigate('/admin/view');
      }, 1000);
    } catch (error) {
      console.error('❌ Failed to update product:', error);
      toast.error('❌ Error updating product.');
    }
  };

  return (
    <>
      <div className="edit-product-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <p className='page-title'>EDIT PRODUCT DETAILS</p>

          {/* Product Name */}
          <div className="form-group">
            <label htmlFor="name">Product ID</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={() => setId(id)}
              placeholder="eg. m001"
            />
            {errors.id && <p className="error">{errors.id}</p>}
          </div>

          {/* Product Name */}
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Elegant Gold Ring"
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          {/* Product Description */}
          <div className="form-group">
            <label htmlFor="description">Product Description</label>
            <textarea
              id="description"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short and catchy product description"
            />
            {errors.description && <p className="error">{errors.description}</p>}
          </div>

          {/* Product Details */}
          <div className="form-group">
            <label>Product Details</label>
            {productDetails.map((detail, index) => (
              <div key={index} className="detail-row">
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => handleDetailChange(index, e.target.value)}
                  placeholder={`Detail ${index + 1}`}
                  className="detail-input"
                />
                {productDetails.length > 1 && (
                  <button type="button" className="remove-btn" onClick={() => removeDetail(index)}>X</button>
                )}
              </div>
            ))}
            <button type="button" className="add-detail-btn" onClick={addMoreDetail}>+</button>
            {errors.details && <p className="error">{errors.details}</p>}
          </div>

          {/* Price */}
          <div className="form-group price-group">
            <div className="price-input">
              <label htmlFor="oldPrice">Old Price ₹</label>
              <input
                type="number"
                id="oldPrice"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                placeholder="e.g. 1999"
              />
              {errors.oldPrice && <p className="error">{errors.oldPrice}</p>}
            </div>
            <div className="price-input">
              <label htmlFor="newPrice">New Price ₹</label>
              <input
                type="number"
                id="newPrice"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="e.g. 1499"
              />
              {errors.newPrice && <p className="error">{errors.newPrice}</p>}
            </div>
          </div>

          {/* Category */}
          <div className="form-group category-group">
            <label htmlFor="category">Select Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select</option>
              <option value="bracelet">Bracelet</option>
              <option value="ring">Ring</option>
              <option value="earring">Earring</option>
              <option value="pendant">Pendant</option>
              <option value="anklet">Anklet</option>
              <option value="nosepin">Nosepin</option>
              <option value="bangle">Bangle</option>
              <option value="mangalsutra">Mangalsutra</option>
            </select>
            {errors.category && <p className="error">{errors.category}</p>}
          </div>

          {/* Stock */}
          <div className="form-group">
            <label htmlFor="stock">Product Stock</label>
            <input
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="e.g. 10"
            />
            {errors.stock && <p className="error">{errors.stock}</p>}
          </div>

          {/* Badge */}
          <div className="form-group">
            <label htmlFor="badge">Product Badge (e.g. Best Seller)</label>
            <select id="badge" value={badge} onChange={(e) => setBadge(e.target.value)}>
              <option value="">Select</option>
              <option value="best seller">Best Seller</option>
              <option value="top pick">Top Pick</option>
              <option value="new arrival">New Arrival</option>
              <option value="trending">Trending</option>
              <option value="popular">Popular</option>
              <option value="exclusive">Exclusive</option>
              <option value="limited stock">Limited Stock</option>
              <option value="elegant">Elegant</option>
              <option value="luxury pick">Luxury Pick</option>
              <option value="valentine special">Valentine Special</option>
              <option value="spiritual choice">Spiritual Choice</option>
              <option value="daily wear">Daily Wear</option>
              <option value="sparkling pick">Sparkling Pick</option>
              <option value="ethnic charm">Ethnic Charm</option>
              <option value="wedding special">Wedding Special</option>
              <option value="daily elegance">Daily Elegance</option>
            </select>
            {errors.badge && <p className="error">{errors.badge}</p>}
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label htmlFor="image-upload">Product Image (260x260 px)</label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
            />
            {errors.image && <p className="error">{errors.image}</p>}
            {imagePreview && (
              <div className="image-preview-container">
                <img className="preview-image" src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="form-group submit-group">
            <button type="submit" className="submit-btn" disabled={!validateForm}>
              Add Product / Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  )
}

export default EditProduct