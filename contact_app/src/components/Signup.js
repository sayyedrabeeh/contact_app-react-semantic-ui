// Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import './darkTheme.css';  

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '',name: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setIsLoading(true);
      const res = await axios.post('https://contact-app-0zrf.onrender.com/users', {
        email: formData.email,
        password: formData.password,
        name: formData.name
      });
    setIsLoading(false);
      alert('Signup successful!');
      navigate('/');
    } catch (error) {
      setIsLoading(false);
      setError('Signup failed. Please try again.');
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="circuit-lines"></div>
        <h2>Create Account</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
          <input 
              name="name" 
              type="text" 
              placeholder="Name" 
              onChange={handleChange} 
              required 
            />
            </div>
            <div className="input-group">
            <input 
              name="email" 
              type="email" 
              placeholder="email" 
              onChange={handleChange} 
              required 
            />
           </div>
          <div className="input-group">
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit"className="signup-btn" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Initialize Account'}
          </button>
        </form>
        <div className="auth-links">
          <p>Already have an account? <a href="/">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;