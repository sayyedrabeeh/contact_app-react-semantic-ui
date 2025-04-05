import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <div className="logo">
        <h1>Contacts</h1>
      </div>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}>
          <i className="address book icon"></i>
          <span>All Contacts</span>
        </div>
      </Link>
      <Link to="/add" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className={`menu-item ${location.pathname === '/add' ? 'active' : ''}`}>
          <i className="plus icon"></i>
          <span>Add Contact</span>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
