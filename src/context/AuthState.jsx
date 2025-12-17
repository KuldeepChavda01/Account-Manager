import { useState } from "react";
import AuthContext from "./authContext";

const AuthState = (props) => {
  // State for all users
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });

  // State for current logged-in user
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  });

  // State for user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("currentUser");
  });

  // Registration Handler
  const register = (newUser) => {
    const userExists = users.some((user) => user.email === newUser.email);
    if (userExists) {
      return {
        success: false,
        message: "User with provided email exists already",
      };
    }

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    return { success: true, message: "Registration successful" };
  };

  // Login Handler
  const login = (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      return { success: false, message: "Invalid credentials" };
    }

    setCurrentUser(user);
    setIsAuthenticated(true);

    localStorage.setItem("currentUser", JSON.stringify(user));

    return { success: true, message: "Login successfull" };
  };

  // Logout Handler
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
  };

  // Update Handler
  const updateUser = (updatedData) => {
    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const updatedUsersList = users.map((user) => {
      return user.email === currentUser.email ? updatedUser : user;
    });
    setUsers(updatedUsersList);
    localStorage.setItem("users", JSON.stringify(updatedUsersList));

    return { success: true, message: "Profile updated successfully" };
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        isAuthenticated,
        login,
        logout,
        register,
        updateUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
