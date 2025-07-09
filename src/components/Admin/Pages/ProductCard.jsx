import React, { useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import "./viewallproducts.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ product }) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        console.log(id);
        let found;

        fetch('http://localhost:3000/api/products')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                found = data.products.find(p => p._id === id || p.id === id);
                if (!found) {
                    console.log('no')
                    return
                }
            })
            .catch();

        // const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        setDeleteOpen(false);

        try {
            const res = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: 'DELETE',
            });
            console.log('hi')

            if (res.ok) {
                toast.success("Product deleted successfully");
                setTimeout(() => {
                    window.location.reload(); // optional
                }, 2000);
            } else {
                toast.error('Error deleting product');
            }
        }
        catch (err) {
            toast.error('Error deleting product');
            console.error(err);
        }
    }

    const handleEdit = (product) => {
        console.log(product._id);
        navigate("/admin/view/edit", { state: { product: product } });
    }

    return (
        <>
            <div className="products-container">
                <div className="image-container">
                    <img
                        src={

                            product.image?.startsWith("/uploads/")
                                ? `http://localhost:3000${product.image}`
                                : product.image
                        }
                        alt={product.name}
                        height={"260"}
                        width={"260"}
                        className='actual-image'
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/no-image.webp";
                        }}
                    />
                </div>
                <div className="prod-information">
                    <div className="prod-name">
                        <span>{product.name}</span>
                    </div>
                    <div className="product-id">
                        <span className="detail-label">ID: </span>
                        <span className="actual-detail">{product._id}</span>
                    </div>
                    <div className="prod-category">
                        <span className="detail-label">Category: </span>
                        <span className="actual-detail">{product.category}</span>
                    </div>
                    <div className="prod-description">
                        <span className="detail-label">Description: </span>
                        <span className="actual-detail">{product.description}</span>
                    </div>
                    <div className="prod-details">
                        <span className="detail-label">Details: </span>
                        <div className="actual-detail">
                            <span>
                                {product.details.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </span>

                        </div>
                    </div>
                </div>

                <div className="prod-other-information">
                    <div className="prod-price">
                        <span className="prod-old-price">
                            <span className="detail-label">Old Price</span>
                            <span className="actual-detail">₹{product.oldPrice}</span>
                        </span>
                        <span className="prod-new-price">
                            <span className="detail-label">New Price</span>
                            <span className="actual-detail">₹{product.price}</span>
                        </span>
                    </div>
                    <div className="prod-rating">
                        <span className="detail-label">☆☆☆☆☆</span>
                        <span className="actual-detail">(0)</span>
                    </div>
                    <div className="prod-stocks">
                        <span className="detail-label">Stocks</span>
                        <span className="actual-detail">{product.stock}</span>
                    </div>
                </div>
                <div className="prod-action-btn">
                    <button className="action-btn prod-edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                    <button className="action-btn prod-remove-btn" onClick={() => setDeleteOpen(true)}>Delete</button>
                </div>
            </div>
            <div className={`no-open ${deleteOpen ? 'delete-model' : ''}`}>
                <div className="delete-model-container">
                    <div className="delete-text">Are you sure you want to delete this product?</div>
                    <div className="action-button">
                        <button className="yes" onClick={() => handleDelete(product._id)}>Yes</button>
                        <button className="no" onClick={() => setDeleteOpen(prev => !prev)}>No</button>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    )
}

export default ProductCard