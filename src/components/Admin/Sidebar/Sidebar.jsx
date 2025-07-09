import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./sidebar.css";

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [sidebar, setSidebar] = useState(false);

    const handleMenuClick = () => {
        setCollapsed(prev => !prev);
        setSidebar(prev => !prev);
    };

    return (
        <>
            {/* Full Sidebar */}
            <section className={`no-sidebar ${sidebar ? 'admin-sidebar' : ''}`}>
                <div className="close-container">
                    <img src="/assets/close.png" alt="Close" className="close-icon" onClick={handleMenuClick} />
                </div>
                <ul className="list-container">
                    <li><NavLink to="/admin/dashboard" className={({ isActive }) => `navlink-container ${isActive ? 'active-link' : ''}`}>
                        <img className='sidebar-icon' src="/assets/Logo.png" alt="Add Product" />
                        <span className='sidebar-title'>Dashboard</span>
                    </NavLink></li>

                    <li><NavLink to="/admin/add" className={({ isActive }) => `navlink-container ${isActive ? 'active-link' : ''}`}>
                        <img className='sidebar-icon' src="/assets/add-product.png" alt="Add Product" />
                        <span className='sidebar-title'>Add Product</span>
                    </NavLink></li>

                    <li><NavLink to="/admin/view" className={({ isActive }) => `navlink-container ${isActive ? 'active-link' : ''}`}>
                        <img className='sidebar-icon' src="/assets/product-research.png" alt="View Products" />
                        <span className='sidebar-title'>View Products</span>
                    </NavLink></li>

                    <li><NavLink to="/admin/users" className={({ isActive }) => `navlink-container ${isActive ? 'active-link' : ''}`}>
                        <img className='sidebar-icon' src="/assets/group.png" alt="Manage Users" />
                        <span className='sidebar-title'>Manage Users</span>
                    </NavLink></li>

                    <li><NavLink to="/admin/orders" className={({ isActive }) => `navlink-container ${isActive ? 'active-link' : ''}`}>
                        <img className='sidebar-icon' src="/assets/shopping-cart.png" alt="Orders" />
                        <span className='sidebar-title'>Orders</span>
                    </NavLink></li>

                    <li><NavLink to="/admin/settings" className={({ isActive }) => `navlink-container ${isActive ? 'active-link' : ''}`}>
                        <img className='sidebar-icon' src="/assets/gear.png" alt="Settings" />
                        <span className='sidebar-title'>Settings</span>
                    </NavLink></li>

                    <li><NavLink to="/admin/logout" className={({ isActive }) => `navlink-container ${isActive ? 'active-link' : ''}`}>
                        <img className='sidebar-icon' src="/assets/logout.png" alt="Logout" />
                        <span className='sidebar-title'>Logout</span>
                    </NavLink></li>
                </ul>
            </section>

            {/* Collapsed Sidebar */}
            <section className={`collapsed ${collapsed ? 'admin-sidebar-collapsed' : ''}`}>
                <div className="menu">
                    <img src="/assets/menus.png" alt="Menu" className="menu-icon" onClick={handleMenuClick} />
                </div>
                <ul className='list-container'>
                    <li><NavLink to="/admin/dashboard" className={({ isActive }) => `navlink-container ${isActive ? 'active-link' : ''}`}>
                        <img className='sidebar-icon' src="/assets/Logo.png" alt="Add" />
                    </NavLink></li>

                    <li><NavLink to="/admin/add" className={({ isActive }) => `navlink-container ${isActive ? 'active-link' : ''}`}>
                        <img className='sidebar-icon' src="/assets/add-product.png" alt="Add" />
                    </NavLink></li>

                    <li><NavLink to="/admin/view" className={({ isActive }) => `navlink-container ${isActive ? 'active-link' : ''}`}>
                        <img className='sidebar-icon' src="/assets/product-research.png" alt="View" />
                    </NavLink></li>

                    <li><NavLink to="/admin/users" className={({ isActive }) => `navlink-container ${isActive ? 'active-link' : ''}`}>
                        <img className='sidebar-icon' src="/assets/group.png" alt="Users" />
                    </NavLink></li>

                    <li><NavLink to="/admin/orders" className={({ isActive }) => `navlink-container ${isActive ? 'active-link' : ''}`}>
                        <img className='sidebar-icon' src="/assets/shopping-cart.png" alt="Orders" />
                    </NavLink></li>

                    <li><NavLink to="/admin/settings" className={({ isActive }) => `navlink-container ${isActive ? 'active-link' : ''}`}>
                        <img className='sidebar-icon' src="/assets/gear.png" alt="Settings" />
                    </NavLink></li>
                </ul>
            </section>
        </>
    );
};

export default Sidebar;
