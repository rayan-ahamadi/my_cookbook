import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log(formData);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const userData = { ...formData }; // Pas d'image envoyée ici

    try {
      const response = await axios.post('http://localhost:5001/api/user/register', userData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(response.data.message);
      // Ajouter un mécanisme de redirection ou un message de succès
    } catch (err) {
      console.error("Error registering user:", err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Surname:</label>
          <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Mot de passe:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength="8" />
        </div>
        <div className="form-group">
          <label>Confirmation du mot de passe:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
