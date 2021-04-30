import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import firebase from "firebase/app";
import "firebase/firestore";
import sat from "../images/sat.png";
import act from "../images/ACT.png";
import est from "../images/est.png";
import ap from "../images/ap.jpg";
import { useHistory } from "react-router-dom";

export default function SignIn(props) {
  const history = useHistory();
  const test = props.history.location.test;

  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onFormSubmit = (event) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(studentEmail, studentPassword)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        history.push({
          pathname: "/",
        });
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        setErrorMessage(error.message);
      });
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
          <h1>{errorMessage}</h1>
          <input
            type="submit"
            value="Sign In"
            style={{ textAlign: "center" }}
          />
        </form>
      </div>
      <Footer />
    </>
  );
}
