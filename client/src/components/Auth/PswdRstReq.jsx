import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from '../Header/NavBar';
import api from '../../api';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/auth/users/reset_password/', { email });
      setMessage('Password reset link has been sent to your email');
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
			<NavBar />
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
			<div className='flex flex-col gap-2'>
				<NavLink to="/signin">Back to Sign In</NavLink>
				<NavLink to="/clientsignup">Back to Sign Up</NavLink>
				<NavLink to="/">Back to Home</NavLink>
			</div>
    </div>
  );
};

export default PasswordResetRequest;