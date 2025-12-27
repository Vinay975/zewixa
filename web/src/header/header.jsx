import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/spotaccom.png";
import { FaUserAlt } from "react-icons/fa";

function Header() {
  return (
    <header className="header">
      <div className="container header-container">

        {/* Left: Logo */}
        <div className="brand">
          <img src={logo} alt="SpotAccom Logo" className="logo-img" />
        </div>

        {/* Middle: Navigation */}
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right: Profile */}
        <div className="right-icons">
          <NavLink to="/profile" className="profile-icon">
            <FaUserAlt />
          </NavLink>
        </div>

      </div>
    </header>
  );
}

export default Header;
