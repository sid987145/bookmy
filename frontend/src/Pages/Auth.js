import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/Auth.css';

const randomBackgrounds = [
  'url(https://source.unsplash.com/random/1600x900?adventure)',
  'url(https://source.unsplash.com/random/1600x900?travel)',
  'url(https://source.unsplash.com/random/1600x900?nature)',
  'url(https://source.unsplash.com/random/1600x900?explore)',
];

function Auth() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Registration
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Toggle for forgot password form
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [email, setEmail] = useState(''); // For forgot password email input
  const [message, setMessage] = useState('');
  const [background, setBackground] = useState('');

  useEffect(() => {
    // Set a random background image
    const randomBg = randomBackgrounds[Math.floor(Math.random() * randomBackgrounds.length)];
    setBackground(randomBg);
  }, []);

  // Toggle between Login and Register
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setIsForgotPassword(false); // Ensure forgot password form is closed
    setMessage(''); // Clear any previous messages
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit for Login/Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? 'http://localhost:8080/login' : 'http://localhost:8080/register';
      const response = await axios.post(url, formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(`Error ${isLogin ? 'logging in' : 'registering'} user`);
    }
  };

  // Handle forgot password email submission
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error sending password reset link');
    }
  };

  return (
    <div className="auth-container" style={{ backgroundImage: background }}>
      <div className="auth-box">
        {!isForgotPassword ? (
          <>
            <h2>Welcome to Tetrix!</h2>
            <div className="welcome-message">
              {isLogin
                ? 'Login to book your TICKET TO ADVENTURE'
                : 'Create a profile and get ready for adventure!'}
            </div>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            {message && <p className="message">{message}</p>}
            {isLogin && (
              <p>
                <a onClick={() => setIsForgotPassword(true)}>Forgot Password?</a>
              </p>
            )}
            <p>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <a onClick={toggleForm}>{isLogin ? 'Register here' : 'Login here'}</a>
            </p>
          </>
        ) : (
          <>
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPasswordSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Send Reset Link</button>
            </form>
            {message && <p className="message">{message}</p>}
            <p>
              <a onClick={() => setIsForgotPassword(false)}>Back to Login</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Auth;
