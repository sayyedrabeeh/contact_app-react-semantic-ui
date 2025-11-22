import React from 'react';
 import { Link,useNavigate } from 'react-router-dom';

// import './darkTheme.css';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = ({ currentUser, contacts }) => {
  const navigate = useNavigate();
  const totalContacts = contacts.length;
  const isAuthenticated = !!localStorage.getItem("token");
  
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
  <div style={{ padding: '2em' }}>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css" />
    
    {/* Header Section */}
    <div className="ui segment" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      borderRadius: '20px',
      padding: '3em',
      marginBottom: '2em',
      boxShadow: '0 15px 40px rgba(102,126,234,0.4)',
      textAlign: 'center',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }}></div>
      <h1 style={{
        fontSize: '3.5em',
        fontWeight: '700',
        margin: '0 0 0.3em 0',
        textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
        letterSpacing: '2px',
        position: 'relative'
      }}>
        <i className="address book icon"></i>
        CONTACT NEXUS
      </h1>
      <p style={{ fontSize: '1.4em', opacity: 0.95, margin: 0, position: 'relative' }}>
        Advanced Contact Management System
      </p>
    </div>

    {/* Welcome Panel */}
    <div className="ui segment" style={{
      background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
      borderRadius: '20px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      border: '1px solid rgba(102,126,234,0.3)',
      padding: '2.5em',
      marginBottom: '2em'
    }}>
      <div style={{
        height: '4px',
        background: 'linear-gradient(90deg, #667eea, #764ba2, #667eea)',
        borderRadius: '20px 20px 0 0',
        marginTop: '-2.5em',
        marginLeft: '-2.5em',
        marginRight: '-2.5em',
        marginBottom: '2em'
      }}></div>

      <h2 className="ui header" style={{ fontSize: '2em', color: '#fff', marginBottom: '0.5em' }}>
        <i className="purple user circle icon"></i>
        <div className="content" style={{ color: '#fff' }}>
          Welcome, {currentUser ? currentUser.name || "User" : "User"}
          <div className="sub header" style={{ fontSize: '0.6em', marginTop: '0.5em', color: '#a0a0b0' }}>
            Your digital contacts are ready to be accessed and managed.
          </div>
        </div>
      </h2>

      <div className="ui divider" style={{ margin: '2em 0', borderColor: 'rgba(255,255,255,0.1)' }}></div>

      {/* Statistics Grid */}
      <div className="ui three column stackable grid" style={{ margin: 0 }}>
        <div className="column">
          <div style={{
            background: 'linear-gradient(145deg, #2a2a3e 0%, #1e1e2e 100%)',
            boxShadow: '0 8px 25px rgba(102,126,234,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
            border: '1px solid rgba(102,126,234,0.4)',
            borderRadius: '15px',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            padding: '2em 1.5em',
            textAlign: 'center'
          }}>
            <i className="huge purple users icon" style={{ marginBottom: '0.5em', filter: 'drop-shadow(0 0 10px rgba(102,126,234,0.5))' }}></i>
            <div style={{ fontSize: '2.8em', fontWeight: 'bold', color: '#667eea', margin: '0.3em 0', textShadow: '0 0 20px rgba(102,126,234,0.5)' }}>
              {totalContacts}
            </div>
            <div style={{ fontSize: '1.1em', fontWeight: '600', color: '#b0b0c0', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Total Contacts
            </div>
            <div style={{ marginTop: '0.5em', color: '#808090', fontSize: '0.9em' }}>
              All stored contacts
            </div>
          </div>
        </div>

        <div className="column">
          <div style={{
            background: 'linear-gradient(145deg, #2a2a3e 0%, #1e1e2e 100%)',
            boxShadow: '0 8px 25px rgba(33,186,69,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
            border: '1px solid rgba(33,186,69,0.4)',
            borderRadius: '15px',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            padding: '2em 1.5em',
            textAlign: 'center'
          }}>
            <i className="huge green clock icon" style={{ marginBottom: '0.5em', filter: 'drop-shadow(0 0 10px rgba(33,186,69,0.5))' }}></i>
            <div style={{ fontSize: '2.8em', fontWeight: 'bold', color: '#21ba45', margin: '0.3em 0', textShadow: '0 0 20px rgba(33,186,69,0.5)' }}>
              {recentContacts.length}
            </div>
            <div style={{ fontSize: '1.1em', fontWeight: '600', color: '#b0b0c0', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Recent
            </div>
            <div style={{ marginTop: '0.5em', color: '#808090', fontSize: '0.9em' }}>
              Last 7 days
            </div>
          </div>
        </div>

        <div className="column">
          <div style={{
            background: 'linear-gradient(145deg, #2a2a3e 0%, #1e1e2e 100%)',
            boxShadow: '0 8px 25px rgba(242,113,28,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
            border: '1px solid rgba(242,113,28,0.4)',
            borderRadius: '15px',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            padding: '2em 1.5em',
            textAlign: 'center'
          }}>
            <i className="huge orange hourglass half icon" style={{ marginBottom: '0.5em', filter: 'drop-shadow(0 0 10px rgba(242,113,28,0.5))' }}></i>
            <div style={{ fontSize: '2.8em', fontWeight: 'bold', color: '#f2711c', margin: '0.3em 0', textShadow: '0 0 20px rgba(242,113,28,0.5)' }}>
              {pendingContacts.length}
            </div>
            <div style={{ fontSize: '1.1em', fontWeight: '600', color: '#b0b0c0', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Pending
            </div>
            <div style={{ marginTop: '0.5em', color: '#808090', fontSize: '0.9em' }}>
              Awaiting action
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Action Buttons */}
    <div style={{ textAlign: 'center', marginTop: '2em' }}>
      <button 
        className="ui big violet button" 
        onClick={goToContacts}
        style={{
          padding: '1.2em 2.5em',
          fontSize: '1.2em',
          boxShadow: '0 10px 30px rgba(102,126,234,0.5)',
          borderRadius: '12px',
          marginRight: '1em',
          marginBottom: '1em',
          fontWeight: '600',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none'
        }}
      >
        <i className="address book icon"></i>
        Access Contacts
      </button>

      {isAuthenticated ? (
        <button 
          onClick={handleLogout}
          style={{
            padding: '1.2em 2.5em',
            fontSize: '1.2em',
            borderRadius: '12px',
            marginBottom: '1em',
            fontWeight: '600',
            background: 'rgba(255,255,255,0.05)',
            border: '2px solid rgba(102,126,234,0.5)',
            color: '#667eea',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          <i className="sign out icon"></i>
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button 
            style={{
              padding: '1.2em 2.5em',
              fontSize: '1.2em',
              borderRadius: '12px',
              marginBottom: '1em',
              fontWeight: '600',
              background: 'rgba(255,255,255,0.05)',
              border: '2px solid rgba(102,126,234,0.5)',
              color: '#667eea',
              cursor: 'pointer'
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

export default Home;