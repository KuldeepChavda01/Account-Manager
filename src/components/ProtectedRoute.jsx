import { useContext } from "react";
import { Navigate } from "react-router-dom";
import authContext from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(authContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
