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
    <div className="contact-card fade-in">
      <div className="contact-header">
        <div className="contact-avatar">
          {getInitials(name)}
        </div>
        <div className="contact-info">
          <h3>{name}</h3>
          <p>{email}</p>
          <p>{mobile}</p>
        </div>
      </div>
      <div className="contact-actions">
        <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
          <button className="action-btn view">
            <i className="eye icon"></i>
          </button>
        </Link>
        <Link to="/edit" state={{ contact: props.contact }}>
          <button className="action-btn edit">
            <i className="edit icon"></i>
          </button>
        </Link>
        <button 
          className="action-btn delete"
          onClick={() => props.clickHandler(id)}
        >
          <i className="trash alternate icon"></i>
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
