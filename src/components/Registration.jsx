import React, { useContext, useState } from "react";
import AuthContext from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const { register } = useContext(AuthContext);

  const navigate = useNavigate();

  // State for credentials
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for errors
  const [errors, setErrors] = useState({});

  // Toggle visibility for password field
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisiblity = () => {
    setShowPassword(!showPassword);
  };

  // Input change handler
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Validation function
  const validate = () => {
    const { name, email, password, confirmPassword } = credentials;

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter valid email ";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    if (password.trim()) {
      if (!confirmPassword.trim()) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        setErrors({});
      }, 2500);
    }

    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();

    if (isValid) {
      const { name, email, password } = credentials;
      const result = register({ name, email, password });

      if (!result.success) {
        setErrors({ email: result.message });

        setTimeout(() => {
          setErrors({});
        }, 2500);

        return;
      }

      setCredentials({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <h1>Create Account</h1>

        <small>{errors.name && errors.name}</small>
        <input
          type="text"
          name="name"
          value={credentials.name}
          onChange={handleOnChange}
          placeholder="Name"
        />

        <small>{errors.email && errors.email}</small>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleOnChange}
          placeholder="Email"
        />

        <div className="password-wrapper">
          <small>{errors.password && errors.password}</small>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={credentials.password}
            onChange={handleOnChange}
            placeholder="Password"
          />
          <span className="toggle-eye" onClick={toggleVisiblity}>
            {showPassword ? (
              <i className="bi bi-unlock"></i>
            ) : (
              <i className="bi bi-lock"></i>
            )}
          </span>
        </div>

        <small>{errors.confirmPassword && errors.confirmPassword}</small>
        <input
          type="password"
          name="confirmPassword"
          value={credentials.confirmPassword}
          onChange={handleOnChange}
          placeholder="Confirm password"
        />

        <button type="submit">Register</button>

        <p>
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </form>
    </>
  );
};

export default Registration;
