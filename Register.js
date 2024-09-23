import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Assuming you have a CSS file for styling
import image2 from '../image2.png';
import imageX from '../x.PNG';
import cloud from '../cloud.png';
const Register = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    service: "",
    numtel: "",
    address: "",
  });

  const { name, email, password, service, numtel, address } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      localStorage.setItem("token", res.data.token);
      //setAuth(true);
      //navigate("/employee-dashboard"); // Redirect to employee dashboard after registration
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    const container = document.querySelector(".register-container"); // Target the register container
    container.classList.add("fade-out"); // Apply the fade-out effect to the container
    setTimeout(() => {
      navigate("/login"); // Navigate to the login page after the animation
    }, 500); // Duration matches the CSS animation
  };


  return (
    <div className="register-container">
      <div className="register-left">
      <img src={imageX} alt="Illustration" /> 
      </div>
      <div className="register-right">
        <h2>Join Our Platform!</h2>
        <img src={cloud} width={45} className="cloudImg" style={{ top: '47px', right: '70px' }} alt="Cloud Icon" />
        <p>Enter details to create your account</p>
        <form onSubmit={onSubmit}>
  <div className="input-group">
    <label htmlFor="name">Your name</label>
    <input
      type="text"
      placeholder="Username"
      name="name"
      value={name}
      onChange={onChange}
      required
      id="name"
    />
  </div>

  <div className="input-group">
    <label htmlFor="service">Service</label>
    <input
      type="text"
      placeholder="Service"
      name="service"
      value={service}
      onChange={onChange}
      required
      id="service"
    />
  </div>

  <div className="input-group">
    <label htmlFor="email">Email</label>
    <input
      type="email"
      placeholder="Email"
      name="email"
      value={email}
      onChange={onChange}
      required
      id="email"
    />
  </div>

  <div className="input-group">
    <label htmlFor="password">Password</label>
    <input
      type="password"
      placeholder="Password"
      name="password"
      value={password}
      onChange={onChange}
      required
      id="password"
    />
  </div>

 

  <div className="input-group">
    <label htmlFor="numtel">Phone Number</label>
    <input
      type="text"
      placeholder="Phone Number"
      name="numtel"
      value={numtel}
      onChange={onChange}
      required
      id="numtel"
    />
  </div>

  <div className="input-group">
    <label htmlFor="address">Address</label>
    <input
      type="text"
      placeholder="Address"
      name="address"
      value={address}
      onChange={onChange}
      required
      id="address"
    />
  </div>

  <button type="submit">Register</button>
  
</form>
<div class="login-text">
Already have an account? <a href="/login" onClick={handleLoginClick}>Login now</a>
</div>
      </div>
    </div>
  );
};

export default Register;
