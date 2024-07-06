import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email && password) {
        const response = await axios.post(
          "/api/v1/admin_user/login",
          { email, password },
          { withCredentials: true }
        );
        setAuth(true);
        navigate("/adminDashboard");
        console.log('Logged in:', response.data);
      } else {
        setError('Please fill in all fields.');
      }
    } catch (e) {
      setError(e.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <section className="app_login">
      <div className='login_box'>
        <h2>Login</h2>
        {error && <p className="error_message">{error}</p>}
        <form className='login_form' onSubmit={handleSubmit}>
          <div className="form_group">
            <label htmlFor='email'>Email</label>
            <input 
              type="email" 
              placeholder='Email' 
              id='email' 
              name='email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form_group">
            <label htmlFor='password'>Password</label>
            <input 
              type='password' 
              placeholder='Password' 
              id='password' 
              name='password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='btn_login'>
            <button type='submit'>Login</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login
