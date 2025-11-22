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
  <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1em' }}>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css" />
    <ToastContainer position="top-right" autoClose={3000} />
    
    <div style={{
      background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
      borderRadius: '20px',
      boxShadow: '0 15px 50px rgba(0,0,0,0.5)',
      border: '1px solid rgba(33,186,69,0.3)',
      padding: '3em'
    }}>
      <h2 style={{
        fontSize: '2.5em',
        color: '#fff',
        marginBottom: '1em',
        paddingBottom: '0.5em',
        borderBottom: '3px solid #21ba45',
        textShadow: '0 0 20px rgba(33,186,69,0.5)'
      }}>
        <i className="edit icon" style={{ color: '#21ba45' }}></i>
        Edit Contact
      </h2>

      <form className="ui form large inverted" onSubmit={update} style={{ marginTop: '2em' }}>
        <div className="field">
          <label style={{ fontSize: '1.1em', fontWeight: '600', color: '#b0b0c0' }}>
            <i className="user icon"></i> Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: '1em',
              fontSize: '1em',
              borderRadius: '10px',
              border: '2px solid rgba(33,186,69,0.3)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff'
            }}
          />
        </div>
        
        <div className="field">
          <label style={{ fontSize: '1.1em', fontWeight: '600', color: '#b0b0c0' }}>
            <i className="envelope icon"></i> Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '1em',
              fontSize: '1em',
              borderRadius: '10px',
              border: '2px solid rgba(33,186,69,0.3)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff'
            }}
          />
        </div>

        <div className="field">
          <label style={{ fontSize: '1.1em', fontWeight: '600', color: '#b0b0c0' }}>
            <i className="phone icon"></i> Phone Number
          </label>
          <input
            type="text"
            placeholder="Enter number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            style={{
              padding: '1em',
              fontSize: '1em',
              borderRadius: '10px',
              border: '2px solid rgba(33,186,69,0.3)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff'
            }}
          />
        </div>
        
        <button 
          type="submit"
          style={{
            width: '100%',
            marginTop: '2em',
            padding: '1.2em',
            fontSize: '1.1em',
            fontWeight: '600',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(33,186,69,0.5)',
            background: 'linear-gradient(135deg, #21ba45 0%, #16ab39 100%)',
            border: 'none',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <i className="save icon"></i>
          Update Contact
        </button>
      </form>
    </div>
  </div>
);
};

export default EditContact;