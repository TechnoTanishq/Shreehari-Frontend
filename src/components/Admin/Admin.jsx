// components/Admin/Admin.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import AddProduct from './Pages/AddProduct';
import ViewAllProducts from './Pages/ViewAllProducts';
import Users from './Pages/Users';
import Orders from './Pages/Orders';
import Settings from './Pages/Settings';
import Sidebar from './Sidebar/Sidebar';
import "./index.css"
import EditProduct from './Pages/EditProduct';

const Admin = () => {
  return (
    <div className="admin-container" style={{ display: 'flex' }}>
      <Sidebar />
      <div className="admin-content" style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/view" element={<ViewAllProducts />} />
          <Route path="/view/edit" element={<EditProduct />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
