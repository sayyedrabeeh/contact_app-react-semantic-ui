import React from 'react';
import { useNavigate } from 'react-router-dom';
import './darkTheme.css';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = ({ currentUser, contacts }) => {
  const navigate = useNavigate();
  const totalContacts = contacts.length;

  
  const recentContacts = contacts.slice(-5);  
  const pendingContacts = contacts.filter(contact => contact.status === 'pending');  

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');  
    toast.info("Logged out successfully"); 
  
    setTimeout(() => {
      window.location.href = '/Home';  
    }, 1000);  
  };

  const goToContacts = () => {
    navigate('/contacts');
  };

  return (
    <div className="page-container">
      <div className="home-container">
        <div className="circuit-background"></div>
        
        <div className="header-section">
          <h1>CONTACT NEXUS</h1>
          <p className="subtitle">Advanced Contact Management System</p>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="welcome-message">
          <div className="welcome-panel">
            <div className="panel-highlight"></div>
            <h2>Welcome, {currentUser ? currentUser.name || "User" : "User"}</h2>
            <p>Your digital contacts are ready to be accessed and managed.</p>
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-value">{totalContacts}</span>
                <span className="stat-label">Contacts</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{recentContacts.length}</span>
                <span className="stat-label">Recent</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{pendingContacts.length}</span>
                <span className="stat-label">Pending</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="primary-btn" onClick={goToContacts}>
            <span className="btn-icon">📋</span>
            Access Contacts
          </button>
          <button className="secondary-btn" onClick={handleLogout}>
            <span className="btn-icon">🔒</span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;