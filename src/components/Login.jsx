import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  // State for credentials
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // State for errors
  const [errors, setErrors] = useState({});

  // Toggle visibility for password field
  const [showPassword, setShowPassword] = useState(false);

  // Input change handler
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Validation function
  const validate = () => {
    const { email, password } = credentials;

    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter valid email ";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
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
      const { email, password } = credentials;
      const result = login(email, password);

      if (!result.success) {
        setErrors({ general: result.message });
        setTimeout(() => {
          setErrors({});
        }, 2500);
        return;
      }

      setCredentials({
        email: "",
        password: "",
      });

      navigate("/account");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <h1>Sign In</h1>

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
          <span
            className="toggle-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <i className="bi bi-unlock"></i>
            ) : (
              <i className="bi bi-lock"></i>
            )}
          </span>
        </div>

        <button type="submit">Login</button>

        <p>
          Don't have an account?
          <Link to="/registration">Register</Link>
        </p>

        <p className="general-error">{errors.general && errors.general}</p>
      </form>
    </>
  );
};

export default Login;
