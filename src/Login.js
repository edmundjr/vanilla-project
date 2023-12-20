import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Replace this with your actual login logic
    try {
      const response = await mockLogin(username, password);
      if (response.success) {
        console.log("Logged in successfully");
        onLoginSuccess(); // Call the function passed from App.js
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
        console.log(error); // Log the error for debugging
        setErrorMessage('Login failed. Please try again later.');
    }
  };

  // Mock login function (replace with your actual login API call)
  const mockLogin = (username, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: username === 'user' && password === 'pass' });
      }, 1000);
    });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <a href="/forgot-password">Forgot Password?</a>
      </form>
    </div>
  );
};

export default Login;
