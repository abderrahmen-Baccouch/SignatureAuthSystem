import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Assuming you have a CSS file for styling

const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("email", res.data.user.email);
      console.log(res.data.user.role);
      console.log(res.data.user.role === "employee");
      // setAuth(true);
      if (res.data.user.role === "employee") {
        navigate("/employee-dashboard");
      } else {
        navigate("/admin-dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">
    <div className="login-left">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className="input-container">
          <label className="label">E-MAIL</label>
          <i className="fas fa-paper-plane"></i>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="input-container">
          <label className="label">PASSWORD</label>
          <i className="fas fa-shield-alt"></i>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" >Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
    <div className="login-right"></div> {/* Right section with the image */}
  </div>

  );
};

export default Login;
