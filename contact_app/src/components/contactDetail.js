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
    <div className="contact-detail fade-in">
      <div className="" style={{ fontSize: '40px' }}>
     

      <img src={userImg} alt="User Avatar" className="  image   my-avatar" />
      
      </div>
      <h2>Name:{name}</h2>
      <p>Email :{email}</p>
      <p>Phone No :{mobile}</p>
      <Link to="/">
        <button className="btn btn-primary">Back to Contacts</button>
      </Link>
    </div>
  );
};

export default ContactDetail;
