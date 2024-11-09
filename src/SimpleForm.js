import React, { useState } from 'react';

function SimpleForm() {
  // Define the state to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({ ...errors, [name]: '' });  // Clear error for the field being edited
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    console.log('Form Data Submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });  // Reset form after submission
  };

  return (
    <div className="form-container">
      {submitted && <p className="success-message">Form submitted successfully!</p>}
      <form onSubmit={handleSubmit} className="simple-form">
        <label className="form-label">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}  // Bind input to formData state
            onChange={handleChange}  // Handle changes to input field
            className="form-input"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </label>
        <label className="form-label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}  // Bind input to formData state
            onChange={handleChange}  // Handle changes to input field
            className="form-input"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </label>
        <label className="form-label">
          Message:
          <textarea
            name="message"
            value={formData.message}  // Bind textarea to formData state
            onChange={handleChange}  // Handle changes to textarea field
            className="form-input"
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </label>
        <button type="submit" className="submit-button">Submit</button>
      </form>

      <style>
        {`
          /* General form styling */
          .form-container {
            max-width: 400px;
            margin: 0 auto;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            font-family: Arial, sans-serif;
          }

          .simple-form {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .form-label {
            font-size: 14px;
            margin: 5px 0;
          }

          .form-input {
            padding: 8px;
            font-size: 13px;
            border-radius: 4px;
            border: 1px solid #ccc;
            margin-bottom: 5px;
            transition: border-color 0.3s ease;
          }

          .form-input:focus {
            border-color: #4e73df;
            outline: none;
          }

          .error-message {
            color: red;
            font-size: 12px;
            margin-top: 3px;
          }

          .success-message {
            color: green;
            font-size: 14px;
            text-align: center;
            margin-bottom: 10px;
          }

          .submit-button {
            padding: 8px;
            background-color: #4e73df;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s ease;
          }

          .submit-button:hover {
            background-color: #2e59d9;
          }

          .submit-button:active {
            background-color: #1f47a2;
          }
        `}
      </style>
    </div>
  );
}

export default SimpleForm;
