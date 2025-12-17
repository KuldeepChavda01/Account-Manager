import "./App.css";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Account from "./components/Account";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthState from "./context/AuthState";
import NavBar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthState>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Navigate to="/account" />} />

            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthState>
    </>
  );
}

export default App;
