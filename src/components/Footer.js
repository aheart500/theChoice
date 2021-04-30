import React, { useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import logo from "../images/logo.png";
import minilogo from "../images/mini-logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <ul className="footer-menu">
          <li>
            <a>
              <b>Pages</b>
            </a>
          </li>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <Link to="./myaccount">
              <a href="">My Account</a>
            </Link>
          </li>
          <li>
            <a href="">Practice</a>
          </li>
          <li>
            <a href="">Search</a>
          </li>
          <li>
            <a href="">Contact</a>
          </li>
        </ul>
        <ul className="footer-tests">
          <li>
            <a>
              <b>Tests</b>
            </a>
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
          <a
            href="https://www.facebook.com/TheChoiceSAT"
            className="icon-buttons"
          >
            <FaFacebook size="3em" />
          </a>
          <a
            href="https://www.instagram.com/thechoicesat/"
            className="icon-buttons"
          >
            <FaInstagram size="3em" />
          </a>
        </div>
        <p>
          All rights reserved to <b>The Choice American Center</b> © 2021.
        </p>
      </div>
      <div className="footer-right">
        <Link to="./">
          <img src={logo} width="250px" />
        </Link>
      </div>
    </footer>
  );
}
