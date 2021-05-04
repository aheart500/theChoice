import React from "react";
import { stack as Menu } from "react-burger-menu";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import minilogo from "../images/mini-logo.png";
import { Link } from "react-router-dom";

export default function Header({ user }) {
  return (
    <header className="app-header">
      <Link to="./">
        <img src={minilogo} width="70px" alt="logo" />
      </Link>
      <div className="header-side">
        <a href="tel:+201149388422" className="icon-buttons">
          <FaPhoneAlt size="2em" />
        </a>
        {user ? (
          <Link to="./myaccount" user={user}>
            <a href="r" className="icon-buttons">
              <FaUser size="2em" />
            </a>
          </Link>
        ) : (
          <Link to="./signup">
            <a href="r" className="icon-buttons">
              <FaUser size="2em" />
            </a>
          </Link>
        )}

        <Menu right>
          <Link to="./">
            <a className="menu-item" href="#a">
              Home
            </a>
          </Link>

          <a className="menu-item" href="#tests">
            Tests
          </a>
          <a className="menu-item" href="#services">
            Services
          </a>
          <a className="menu-item" href="#about">
            About
          </a>
          <a className="menu-item" href="#testimonials">
            Testimonials
          </a>
        </Menu>
      </div>
    </header>
  );
}
