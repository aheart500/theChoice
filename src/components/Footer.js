import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import logo from "../images/logo.png";

import { Link } from "react-router-dom";

export default function Footer({ style }) {
  return (
    <footer style={style ? style : { marginTop: "auto" }}>
      <div className="footer-left">
        <ul className="footer-menu">
          <li>
            <b>Pages</b>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="./myaccount">My Account</Link>
          </li>
          <li>
            <Link to="/">Practice</Link>
          </li>
          <li>
            <Link to="/">Search</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
        </ul>
        <ul className="footer-tests">
          <li>
            <b>Tests</b>
          </li>
          <li>
            <a href="2">SAT</a>
          </li>
          <li>
            <a href="2">ACT</a>
          </li>
          <li>
            <a href="2">EST</a>
          </li>
          <li>
            <a href="2">AP</a>
          </li>
          <li>
            <a href="2">GMAT</a>
          </li>
          <li>
            <a href="2">GRE</a>
          </li>
        </ul>
      </div>
      <div className="center">
        <div>
          <a href="https://www.facebook.com/TheChoiceSAT" className="icon-buttons">
            <FaFacebook size="3em" />
          </a>
          <a href="https://www.instagram.com/thechoicesat/" className="icon-buttons">
            <FaInstagram size="3em" />
          </a>
        </div>
        <p>
          All rights reserved to <b>The Choice American Center</b> © 2021.
        </p>
      </div>
      <div className="footer-right">
        <Link to="./">
          <img src={logo} width="250px" alt="logo" />
        </Link>
      </div>
    </footer>
  );
}
