import React from "react";
import { Link, useLocation } from "react-router-dom";
import userImg from '../images/user1.png';


const ContactDetail = () => {
  const location = useLocation();
  const { contact } = location.state || {};
  
  if (!contact) {
    return (
      <div className="empty-state">
        <i className="exclamation triangle icon"></i>
        <h3>No Contact Found</h3>
        <p>The contact you're looking for doesn't exist or was deleted.</p>
        <Link to="/">
          <button className="btn btn-primary">Back to Contacts</button>
        </Link>
      </div>
    );
  }
  
  const { name, email,mobile } = contact;
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
 return (
  <div style={{ maxWidth: '600px', margin: '2em auto', padding: '1em' }}>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css" />
    
    <div style={{
      borderRadius: '25px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
      border: '1px solid rgba(102,126,234,0.3)',
      overflow: 'hidden',
      background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '3em',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>
        <img 
          src={userImg} 
          alt="User Avatar" 
          style={{
            width: '150px',
            height: '150px',
            margin: '0 auto',
            border: '5px solid rgba(255,255,255,0.3)',
            boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
            objectFit: 'cover',
            borderRadius: '50%',
            position: 'relative'
          }}
        />
      </div>
      
      <div style={{ padding: '2.5em', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '2.2em', 
          color: '#fff', 
          marginBottom: '1em',
          textShadow: '0 0 20px rgba(102,126,234,0.3)'
        }}>
          <i className="user icon" style={{ color: '#667eea' }}></i> {name}
        </h2>
        
        <div style={{ 
          fontSize: '1.2em', 
          color: '#b0b0c0', 
          lineHeight: '2.5em', 
          textAlign: 'left', 
          maxWidth: '400px', 
          margin: '0 auto' 
        }}>
          <p style={{ 
            margin: '0.8em 0', 
            padding: '1em', 
            background: 'rgba(102,126,234,0.1)', 
            borderRadius: '12px',
            border: '1px solid rgba(102,126,234,0.2)'
          }}>
            <i className="envelope icon" style={{ color: '#667eea' }}></i> 
            <strong style={{ color: '#fff' }}>Email:</strong> {email}
          </p>
          <p style={{ 
            margin: '0.8em 0', 
            padding: '1em', 
            background: 'rgba(102,126,234,0.1)', 
            borderRadius: '12px',
            border: '1px solid rgba(102,126,234,0.2)'
          }}>
            <i className="phone icon" style={{ color: '#667eea' }}></i> 
            <strong style={{ color: '#fff' }}>Phone:</strong> {mobile}
          </p>
        </div>
      </div>
      
      <div style={{ 
        padding: '1.5em', 
        textAlign: 'center', 
        background: 'rgba(0,0,0,0.3)',
        borderTop: '1px solid rgba(102,126,234,0.2)'
      }}>
        <Link to="/">
          <button style={{
            padding: '1em 2.5em',
            borderRadius: '50px',
            fontWeight: '600',
            boxShadow: '0 8px 25px rgba(102,126,234,0.4)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1.1em'
          }}>
            <i className="arrow left icon"></i>
            Back to Contacts
          </button>
        </Link>
      </div>
    </div>
  </div>
)
};

export default ContactDetail;
