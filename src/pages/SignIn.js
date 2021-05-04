import React, { useState, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "firebase/firestore";
import UserContext from "../Contexts/User/UserContext";

export default function SignIn(props) {
  const { Login } = useContext(UserContext);

  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    Login({ username: studentEmail, password: studentPassword })
      .then(() => {
        window.location.replace("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Header />
      <div className="signup-form">
        <h1 style={{ marginTop: "100px" }}>Welcome Back! Sign in below</h1>
        <form onSubmit={onFormSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={studentEmail}
              onChange={(event) => setStudentEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={studentPassword}
              onChange={(event) => setStudentPassword(event.target.value)}
              required
            />
          </label>

          <input type="submit" value="Sign In" style={{ textAlign: "center" }} />
        </form>
      </div>
      <Footer />
    </>
  );
}
