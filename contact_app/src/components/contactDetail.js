import React from "react";
import { Link, useLocation } from "react-router-dom";

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
  
  const { name, email } = contact;
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="contact-detail fade-in">
      <div className="contact-avatar avatar" style={{ fontSize: '40px' }}>
        {getInitials(name)}
      </div>
      <h2>{name}</h2>
      <p>{email}</p>
      <Link to="/">
        <button className="btn btn-primary">Back to Contacts</button>
      </Link>
    </div>
  );
};

export default ContactDetail;
