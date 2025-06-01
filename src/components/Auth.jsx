import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

export default function Auth() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email || !password) {
      setMessage('Please fill in all fields.');
      return;
    }
    if (!validateEmail(email)) {
      setMessage('Invalid email format.');
      return;
    }
    if (password.length < 1) {
      setMessage('Password must be at least 1 characters.');
      return;
    }

    setLoading(true);
    const url = 'https://server-capstone-design-tb-sgnp.vercel.app/api/login';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Error occurred');
      } else {
        if (data.token) localStorage.setItem('authToken', data.token);
        setMessage('Login successful! Redirecting...');
        setTimeout(() => navigate('/dashboard'), 1000);
      }
    } catch {
      setMessage('Network error, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const goToSignUp = () => {
    navigate('/signup'); // pindah ke halaman SignUp.jsx
  };

  return (
    <div className="auth-container">
      <div className="left-side">
        <img
          src="/profile.jpg"
          alt="LAC Logo"
          draggable={false}
          className="logo"
        />
      </div>

      <div className="right-side">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <h1>Sign In</h1>
          <p>Welcome Back! Enter your Information below</p>

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            minLength={6}
          />

          <button
            type="submit"
            disabled={loading}
            className="btn-submit"
            aria-busy={loading}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>

          <div className="divider"><span>Or</span></div>

          <button
            type="button"
            className="btn-google"
            onClick={() => alert('Google Sign-In dummy')}
          >
            <img
              src="/google.png"
              alt="Google"
              width={20}
              height={20}
            />
            Sign In With Google
          </button>

          <p className="switch-text">
            Don't have an account?{' '}
            <button
              type="button"
              className="link-button"
              onClick={goToSignUp}  // tombol Sign Up navigasi
              disabled={loading}
            >
              Sign Up
            </button>
          </p>

          {message && (
            <p className="form-message" role="alert" aria-live="polite">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
