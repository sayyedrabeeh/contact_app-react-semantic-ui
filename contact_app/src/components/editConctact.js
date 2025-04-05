import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditContact = ({ updateContactHandler }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { id, name: initialName, email: initialEmail } = location.state?.contact || {};
  
  const [name, setName] = useState(initialName || "");
  const [email, setEmail] = useState(initialEmail || "");
  
  const update = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All fields are mandatory");
      return;
    }
    
    updateContactHandler({ id, name, email });
    navigate("/");
  };
  
  if (!location.state?.contact) {
    return (
      <div className="empty-state">
        <i className="exclamation triangle icon"></i>
        <h3>No Contact Selected</h3>
        <p>Please select a contact to edit from the contact list.</p>
        <Link to="/">
          <button className="btn btn-primary">Back to Contacts</button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="fade-in">
      <div className="header">
        <h2>Edit Contact</h2>
      </div>
      
      <div className="form-container">
        <form onSubmit={update}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <button className="btn btn-primary">Update Contact</button>
        </form>
      </div>
    </div>
  );
};

export default EditContact;