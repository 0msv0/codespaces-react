import React, { useState } from "react";
import axios from "axios";
import "./RegisterForm.scss";
import "bootstrap/scss/bootstrap.scss";
import { redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.firstName.trim() === "") {
      newErrors.firstName = "First name is required";
    }
    if (formData.lastName.trim() === "") {
      newErrors.lastName = "Last name is required";
    }
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.address.trim() === "") {
      newErrors.address = "Address is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post("https://0msv0-crispy-space-orbit-4vpp59w6x6q2794r-3001.preview.app.github.dev/api/register", formData, {
            withCredentials: true, // Include credentials in the request
          })
        .then((response) => {
          console.log("Registration successful:", response.data);
          alert("Registration successful");
          // Redirect to the desired page
          navigate("/");
          // Reset form data and errors if needed
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            address: "",
          });
          setErrors({});
        })
        .catch((error) => {
          if (error.response && error.response.data.errors) {
            setErrors(error.response.data.errors);
          } else {
            console.error("Registration failed:", error);
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="form-control"
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="form-control"
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="form-control"
        />
        {errors.address && <span className="error">{errors.address}</span>}
      </div>
      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
