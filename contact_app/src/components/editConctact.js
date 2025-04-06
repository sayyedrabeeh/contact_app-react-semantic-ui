import React, { useState } from "react";
import { useLocation, useNavigate,Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditContact = ({ updateContactHandler }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { id, name: initialName, email: initialEmail  ,mobile:initialmobile} = location.state?.contact || {};
  
  const [name, setName] = useState(initialName || "");
  const [email, setEmail] = useState(initialEmail || "");
  const [mobile, setMobile] = useState(initialmobile || "");
  
  const update = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
        toast.error("All fields are mandatory!");
      return;
    }
    if (mobile === "" || mobile.length < 10 || isNaN(mobile)) {
        toast.error("Enter a valid mobile number with at least 10 digits");
        return;
      }
      
    
    updateContactHandler({ id, name, email,mobile });
    toast.success("Contact updated successfully!");
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
      <ToastContainer position="top-right" autoClose={3000} />

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
          
          <div className="form-group">
            <label>Phone No</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          
          <button className="btn btn-primary">Update Contact</button>
        </form>
      </div>
    </div>
  );
};

export default EditContact;