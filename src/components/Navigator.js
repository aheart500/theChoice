import React, { useState } from "react";
import { stack as Menu } from "react-burger-menu";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import logo from "../images/logo.png";
import minilogo from "../images/mini-logo.png";
import { Link } from "react-router-dom";

export default function Navigator({ profile }) {
  return (
    <div className="navigator">
      <div className="nav-option">
        {profile ? (
          <>
            <div className="circle"></div>
            <h1 style={{ fontWeight: "700" }}>Profile</h1>
          </>
        ) : (
          <>
            <h1 style={{ fontWeight: "500" }}>Profile</h1>
          </>
        )}
      </div>
      <div className="nav-option">
        {profile ? (
          <>
            <h1 style={{ fontWeight: "500" }}>Subscriptions</h1>
          </>
        ) : (
          <>
            <div className="circle"></div>
            <h1 style={{ fontWeight: "700" }}>Subscriptions</h1>
          </>
        )}
      </div>
    </div>
  );
}
