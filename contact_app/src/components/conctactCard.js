import React from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const ContactCard = (props) => {
  const { id, name, email,mobile } = props.contact;
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
 return (
  <div className="column">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css" />
    
    <div style={{
      borderRadius: '15px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
      border: '1px solid rgba(102,126,234,0.3)',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
      background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)'
    }}>
      <div style={{ padding: '1.5em' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <div style={{
            minWidth: '60px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.5em',
            fontWeight: 'bold',
            boxShadow: '0 6px 20px rgba(102,126,234,0.5)'
          }}>
            {getInitials(name)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ 
              margin: '0 0 0.3em 0', 
              color: '#fff', 
              fontSize: '1.3em', 
              fontWeight: '600',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {name}
            </h3>
            <p style={{ 
              margin: '0.2em 0', 
              color: '#b0b0c0', 
              fontSize: '0.9em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              <i className="envelope icon" style={{ color: '#667eea' }}></i> {email}
            </p>
            <p style={{ 
              margin: '0.2em 0', 
              color: '#b0b0c0', 
              fontSize: '0.9em' 
            }}>
              <i className="phone icon" style={{ color: '#667eea' }}></i> {mobile}
            </p>
          </div>
        </div>
      </div>
      
      <div style={{
        background: 'rgba(0,0,0,0.3)',
        padding: '1em',
        display: 'flex',
        gap: '0.5em',
        justifyContent: 'center',
        borderTop: '1px solid rgba(102,126,234,0.2)'
      }}>
        <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
          <button style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <i className="eye icon" style={{ margin: 0 }}></i>
          </button>
        </Link>
        <Link to="/edit" state={{ contact: props.contact }}>
          <button style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(33,133,208,0.2)',
            border: '2px solid #2185d0',
            color: '#2185d0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <i className="edit icon" style={{ margin: 0 }}></i>
          </button>
        </Link>
        <button 
          onClick={() => props.clickHandler(id)}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(219,40,40,0.2)',
            border: '2px solid #db2828',
            color: '#db2828',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <i className="trash alternate icon" style={{ margin: 0 }}></i>
        </button>
      </div>
    </div>
  </div>
);
};

export default ContactCard;
