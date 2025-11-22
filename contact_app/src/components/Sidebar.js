import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');  
    toast.info("Logged out successfully"); 

  setTimeout(() => {
    window.location.href = '/home';  
  }, 1000);  
};
 return (
  <div style={{
    width: '280px',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f0f1e 100%)',
    boxShadow: '4px 0 30px rgba(0,0,0,0.5)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(102,126,234,0.2)'
  }}>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css" />
    
    {/* Logo Section */}
    <div style={{
      padding: '2em 1.5em',
      textAlign: 'center',
      borderBottom: '1px solid rgba(102,126,234,0.2)',
      background: 'rgba(102,126,234,0.1)'
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        margin: '0 auto 1em',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 25px rgba(102,126,234,0.4)'
      }}>
        <i className="address book icon" style={{ fontSize: '2em', color: 'white', margin: 0 }}></i>
      </div>
      <h1 style={{
        color: 'white',
        fontSize: '1.8em',
        fontWeight: '700',
        margin: 0,
        textShadow: '0 2px 10px rgba(102,126,234,0.5)',
        letterSpacing: '1px'
      }}>
        Contacts
      </h1>
      <p style={{ color: '#808090', fontSize: '0.85em', margin: '0.5em 0 0 0' }}>Management System</p>
    </div>

   
    <div style={{ flex: 1, padding: '1.5em 0', overflowY: 'auto' }}>
      <Link to="/Home" style={{ textDecoration: 'none' }}>
        <div style={{
          padding: '1.2em 1.5em',
          margin: '0.5em 1em',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '1em',
          fontSize: '1.05em',
          transition: 'all 0.3s ease',
          background: location.pathname === '/Home' ? 'linear-gradient(90deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.2) 100%)' : 'transparent',
          borderLeft: location.pathname === '/Home' ? '4px solid #667eea' : '4px solid transparent',
          borderRadius: '0 10px 10px 0',
          cursor: 'pointer',
          boxShadow: location.pathname === '/Home' ? '0 4px 15px rgba(102,126,234,0.3)' : 'none'
        }}>
          <i className="home icon" style={{ fontSize: '1.3em', color: location.pathname === '/Home' ? '#667eea' : '#b0b0c0' }}></i>
          <span style={{ fontWeight: location.pathname === '/Home' ? '600' : '500' }}>Home</span>
        </div>
      </Link>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <div style={{
          padding: '1.2em 1.5em',
          margin: '0.5em 1em',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '1em',
          fontSize: '1.05em',
          transition: 'all 0.3s ease',
          background: location.pathname === '/' ? 'linear-gradient(90deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.2) 100%)' : 'transparent',
          borderLeft: location.pathname === '/' ? '4px solid #667eea' : '4px solid transparent',
          borderRadius: '0 10px 10px 0',
          cursor: 'pointer',
          boxShadow: location.pathname === '/' ? '0 4px 15px rgba(102,126,234,0.3)' : 'none'
        }}>
          <i className="users icon" style={{ fontSize: '1.3em', color: location.pathname === '/' ? '#667eea' : '#b0b0c0' }}></i>
          <span style={{ fontWeight: location.pathname === '/' ? '600' : '500' }}>All Contacts</span>
        </div>
      </Link>

      <Link to="/add" style={{ textDecoration: 'none' }}>
        <div style={{
          padding: '1.2em 1.5em',
          margin: '0.5em 1em',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '1em',
          fontSize: '1.05em',
          transition: 'all 0.3s ease',
          background: location.pathname === '/add' ? 'linear-gradient(90deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.2) 100%)' : 'transparent',
          borderLeft: location.pathname === '/add' ? '4px solid #667eea' : '4px solid transparent',
          borderRadius: '0 10px 10px 0',
          cursor: 'pointer',
          boxShadow: location.pathname === '/add' ? '0 4px 15px rgba(102,126,234,0.3)' : 'none'
        }}>
          <i className="plus circle icon" style={{ fontSize: '1.3em', color: location.pathname === '/add' ? '#667eea' : '#b0b0c0' }}></i>
          <span style={{ fontWeight: location.pathname === '/add' ? '600' : '500' }}>Add Contact</span>
        </div>
      </Link>
    </div>

    
    <div style={{ 
      padding: '1.5em',
      borderTop: '1px solid rgba(102,126,234,0.2)',
      background: 'rgba(0,0,0,0.2)'
    }}>
      {isAuthenticated ? (
        <button 
          onClick={handleLogout}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            padding: '1em',
            fontSize: '1em',
            fontWeight: '600',
            borderRadius: '10px',
            cursor: 'pointer',
            color: 'white',
            boxShadow: '0 6px 20px rgba(102,126,234,0.4)',
            transition: 'all 0.3s ease'
          }}
        >
          <i className="sign out icon"></i>
          Logout
        </button>
      ) : (
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button 
            style={{
              width: '100%',
              background: 'rgba(102,126,234,0.2)',
              border: '2px solid rgba(102,126,234,0.5)',
              padding: '1em',
              fontSize: '1em',
              fontWeight: '600',
              borderRadius: '10px',
              cursor: 'pointer',
              color: '#667eea',
              transition: 'all 0.3s ease'
            }}
          >
            <i className="sign in icon"></i>
            Login
          </button>
        </Link>
      )}
    </div>
  </div>
);

};

export default Sidebar;
