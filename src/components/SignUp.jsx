import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/SignUp.css';

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    gender: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // Validasi wajib
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password ||
      !formData.gender
    ) {
      setMessage('Please fill all required fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://server-capstone-design-tb-sgnp.vercel.app/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          gender: formData.gender === 'male', // kirim boolean sesuai requirement API
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Registration failed.');
      } else {
        setMessage('Registration successful! Redirecting to login...');
        setFormData({ email: '', password: '', first_name: '', last_name: '', gender: '' });
        setTimeout(() => {
          navigate('/signin'); // Redirect ke halaman login
        }, 1500);
      }
    } catch (error) {
      setMessage('Network error, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="left-side">
        <img
          src="/profile.jpg"
          alt="LAC Logo"
          draggable={false}
          className="logo"
        />
      </div>

      <div className="right-side">
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <h1>Create Your Account</h1>

          <div className="name-fields">
            <div className="input-group">
              <label htmlFor="first_name">First name *</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Enter your first name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="last_name">Last name *</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Enter your last name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          <div className="gender-options">
            <label htmlFor="genderMale">
              <input
                type="radio"
                id="genderMale"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
                required
              />
              Male
            </label>

            <label htmlFor="genderFemale">
              <input
                type="radio"
                id="genderFemale"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              Female
            </label>
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>

          {message && (
            <p className="form-message" role="alert" aria-live="polite">
              {message}
            </p>
          )}

          <p className="login-link">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
