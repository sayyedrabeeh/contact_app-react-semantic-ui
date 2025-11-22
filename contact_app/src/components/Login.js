import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './darkTheme.css'; // Import the CSS file
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";


const Login = ({ setIsAuthenticated,onLoginSuccess  }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;

    // Save token locally
    const token = await user.getIdToken();
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user.uid);

    setIsAuthenticated(true);
    navigate("/home");
  } catch (err) {
    setError(err.message);
    console.error("Login error:", err);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="circuit-lines"></div>
        <h2>Access Terminal</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" disabled={isLoading} className="login-btn">
            {isLoading ? 'Authenticating...' : 'Access System'}
          </button>
        </form>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

        <div className="auth-links">
          <p>No account yet? <Link to="/signup"  >Create New Account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;