import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddContact = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const add = async (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
        toast.error("All fields are mandatory!");
      return;
    }
    if (mobile === "" || mobile.length < 10 || isNaN(mobile)) {
        toast.error("Enter a valid mobile number with at least 10 digits");
        return;
      }
      
     try {
        await props.addContactHandler({ name, email, mobile }); 
    setName("");
    setEmail("");
    setMobile("");
    toast.success("Contact added successfully!");
    navigate("/"); 
  } catch (error) {
    toast.error("Failed to add contact!");
  }
  };

 return (
  <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1em' }}>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css" />
    
    <div style={{
      background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
      borderRadius: '20px',
      boxShadow: '0 15px 50px rgba(0,0,0,0.5)',
      border: '1px solid rgba(102,126,234,0.3)',
      padding: '3em'
    }}>
      <h2 style={{
        fontSize: '2.5em',
        color: '#fff',
        marginBottom: '1em',
        paddingBottom: '0.5em',
        borderBottom: '3px solid #667eea',
        textShadow: '0 0 20px rgba(102,126,234,0.5)'
      }}>
        <i className="user plus icon" style={{ color: '#667eea' }}></i>
        Add Contact
      </h2>

      <form className="ui form large inverted" onSubmit={add} style={{ marginTop: '2em' }}>
        <div className="field">
          <label style={{ fontSize: '1.1em', fontWeight: '600', color: '#b0b0c0' }}>
            <i className="user icon"></i> Name
          </label>
          <input
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: '1em',
              fontSize: '1em',
              borderRadius: '10px',
              border: '2px solid rgba(102,126,234,0.3)',
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
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '1em',
              fontSize: '1em',
              borderRadius: '10px',
              border: '2px solid rgba(102,126,234,0.3)',
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
            placeholder="Enter phone number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            style={{
              padding: '1em',
              fontSize: '1em',
              borderRadius: '10px',
              border: '2px solid rgba(102,126,234,0.3)',
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
            boxShadow: '0 10px 30px rgba(102,126,234,0.5)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <i className="check circle icon"></i>
          Add Contact
        </button>
      </form>
    </div>
  </div>
);

};

export default AddContact;
