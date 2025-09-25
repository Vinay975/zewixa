import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/logo.svg";
import { FaHome, FaInfoCircle, FaSignInAlt, FaUserCircle } from "react-icons/fa";

function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        {/* Left: Logo + Brand */}
        <div className="brand">
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="brandSpot">Spot</span>
          <span className="brandAccomm">Accom</span>
        </div>

        {/* Middle: Navigation */}
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                <FaInfoCircle /> About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right: Login & Profile */}
        <div className="right-icons">
          <NavLink to="/forlogin"><FaSignInAlt /></NavLink>
          <NavLink to="/profile"><FaUserCircle /></NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
