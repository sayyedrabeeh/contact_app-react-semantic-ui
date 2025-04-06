import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './darkTheme.css'; // Import the CSS file

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
    setError('');
    setIsLoading(true);
    try {
      const res = await axios.get('https://contact-app-0zrf.onrender.com/users', {
        params: {
          email: formData.email,
          password: formData.password
        }
      });
  
      if (res.data.length > 0) {
        const user = res.data[0];
        localStorage.setItem('token', user.id);  
         localStorage.setItem('userId', user.id);
        setIsAuthenticated(true);
        onLoginSuccess(user);
        navigate('/Home',{ replace: true });
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Try again later.');
      console.error('Login error:', error);
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