import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <h1 className="logo">Account Manager</h1>

      <ul className="nav-items">
        <li className="nav-item">
          <Link to="/account">
            <i className="bi bi-person-circle"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
