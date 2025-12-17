import React, { useContext, useEffect, useState } from "react";
import authContext from "../context/authContext";

const Account = () => {
  const { currentUser, logout, updateUser } = useContext(authContext);

  // State for editing status
  const [isEditing, setIsEditing] = useState(false);

  // State for updated information
  const [dataToUpdate, setDataToUpdate] = useState(currentUser);

  // State for errors
  const [errors, setErrors] = useState({});

  // Toggle visibility for password field
  const [showPassword, setShowPassword] = useState(false);

  // Syncs dataToUpdate with curentUser
  useEffect(() => {
    setDataToUpdate(currentUser);
  }, [currentUser]);

  // Input change handler
  const handleOnChange = (e) => {
    setDataToUpdate({ ...dataToUpdate, [e.target.name]: e.target.value });
  };

  // Handles logout
  const handleLogout = () => {
    logout();
  };

  // Enables editing
  const enableEditing = () => {
    setIsEditing(true);
  };

  // Quit editing
  const quitEditing = () => {
    setDataToUpdate(currentUser);
    setIsEditing(false);
  };

  // Validation function
  const validate = () => {
    const { name, email, password } = dataToUpdate;

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
      updateUser(dataToUpdate);
      setIsEditing(false);
    }
  };

  return (
    <>
      {!isEditing ? (
        <div className="profile">
          <h1>My Profile</h1>

          <h2>Welcome back, {currentUser.name}!</h2>

          <p>
            Name: <span>{currentUser.name}</span>
          </p>
          <p>
            Email: <span>{currentUser.email}</span>
          </p>

          <div className="profile-btn-wrapper">
            <button onClick={handleLogout}>Logout</button>
            <button onClick={enableEditing}>Edit</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Edit Profile</h1>

          <small>{errors.name && errors.name}</small>
          <input
            type="text"
            name="name"
            value={dataToUpdate.name}
            onChange={handleOnChange}
            placeholder="Name"
          />

          <small>{errors.email && errors.email}</small>
          <input
            type="email"
            name="email"
            value={dataToUpdate.email}
            onChange={handleOnChange}
            placeholder="Email"
          />

          <div className="password-wrapper">
            <small>{errors.password && errors.password}</small>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={dataToUpdate.password}
              onChange={handleOnChange}
              placeholder="New Password"
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

          <div className="button-group">
            <button type="submit" className="update-btn">
              Update
            </button>
            <button type="button" onClick={quitEditing}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Account;
