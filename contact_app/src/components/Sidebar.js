import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');  
  toast.info("Logged out successfully"); 

  setTimeout(() => {
    window.location.href = '/home';  
  }, 1000);  
};
  return (
    <div className="sidebar">
      <div className="logo">
        <h1>Contacts</h1>
      </div>
      <Link to="/Home" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className={`menu-item ${location.pathname === '/Home' ? 'active' : ''}`}>
          <i className="address book icon"></i>
          <span>Home</span>
        </div>
      </Link>
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
      <button className="secondary-btn" onClick={handleLogout}>
            <span className="btn-icon">🔒</span>
            Logout
          </button>
    </div>
  );
};

export default Sidebar;
