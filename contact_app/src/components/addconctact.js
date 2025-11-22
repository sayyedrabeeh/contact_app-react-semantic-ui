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
    <div className="fade-in">
      <div className="header">
        <h2>Add Contact</h2>
      </div>
      

      <div className="form-container">
        <form onSubmit={add}>
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
              placeholder="Enter Mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          
          <button className="btn btn-primary">Add Contact</button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
