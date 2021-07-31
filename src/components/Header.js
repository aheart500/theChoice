import React from "react";
import { stack as Menu } from "react-burger-menu";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import minilogo from "../images/mini-logo.png";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
export default function Header({ user, style }) {
  return (
    <header className="app-header" style={style}>
      <Link to="./">
        <img src={minilogo} width="70px" alt="logo" />
      </Link>
      <div className="header-side">
        <a href="tel:+201149388422" className="icon-buttons">
          <FaPhoneAlt size="2em" />
        </a>
        {user ? (
          <Link to="./myaccount" user={user} className="icon-buttons">
            <FaUser size="2em" />
          </Link>
        ) : (
          <Link to="./signup" className="icon-buttons">
            <FaUser size="2em" />
          </Link>
        )}

        <Menu right>
          <HashLink to="./" className="menu-item">
            Home
          </HashLink>
          <HashLink className="menu-item" to="/home#tests">
            Tests
          </HashLink>
          <HashLink className="menu-item" to="/home#services">
            Services
          </HashLink>
          <HashLink className="menu-item" to="/home#about">
            About
          </HashLink>
          <HashLink className="menu-item" to="/home#testimonials">
            Testimonials
          </HashLink>
        </Menu>
      </div>
    </header>
  );
}
