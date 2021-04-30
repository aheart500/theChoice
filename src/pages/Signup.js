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

export default function Signup(props) {
  const history = useHistory();
  const test = props.history.location.test;

  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState();
  const [studentGrade, setStudentGrade] = useState();
  const [studentEmail, setStudentEmail] = useState("");
  const [studentSat, setStudentSat] = useState();
  const [studentAct, setStudentAct] = useState();
  const [studentEst, setStudentEst] = useState();
  const [studentPassword, setStudentPassword] = useState("");
  const [studentConfirmPassword, setStudentConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [user, setUser] = useState();
  const [testa, setTesta] = useState("");
  const onFormSubmit = (event) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(studentEmail, studentPassword)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);

        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        setErrorMessage(error.message);
        // ..
      });
    event.preventDefault();
  };
  if (user) {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set({
        name: studentName,
        phone: studentPhone,
        grade: studentGrade,
        sat: studentSat,
        act: studentAct,
        est: studentEst,
      })
      .then(
        history.push({
          pathname: "/",
        })
      );
  }
  const onForm = (event) => {
    history.push({
      pathname: "/test",
      name: studentName,
      phone: studentPhone,
    });
  };
  const RedirecttoLogIn = (event) => {
    history.push({
      pathname: "/signin",
    });
  };
  return (
    <>
      <Header />
      <div className="signup-form">
        <h1 style={{ marginTop: "100px" }}>
          Fill in your information to create an account!
        </h1>
        <h2 style={{ marginBottom: "0px" }}>Already have an account?</h2>
        <a onClick={() => RedirecttoLogIn()}>Click here to log in</a>
        <form onSubmit={onFormSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
              required
            />
          </label>
          <label>
            Phone No:
            <input
              type="phone"
              name="number"
              value={studentPhone}
              onChange={(event) => setStudentPhone(event.target.value)}
              required
            />
          </label>
          <label>
            Grade:
            <input
              type="number"
              name="grade"
              value={studentGrade}
              onChange={(event) => setStudentGrade(event.target.value)}
              required
            />
          </label>
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
            What's your highest SAT score?
            <input
              type="number"
              name="satScore"
              value={studentSat}
              onChange={(event) => setStudentSat(event.target.value)}
            />
          </label>
          <label>
            What's your highest ACT score?
            <input
              type="number"
              name="actScore"
              value={studentAct}
              onChange={(event) => setStudentAct(event.target.value)}
            />
          </label>
          <label>
            What's your highest EST score?
            <input
              type="number"
              name="estScore"
              value={studentEst}
              onChange={(event) => setStudentEst(event.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={studentPassword}
              onChange={(event) => setStudentPassword(event.target.value)}
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmpassword"
              value={studentConfirmPassword}
              onChange={(event) =>
                setStudentConfirmPassword(event.target.value)
              }
            />
          </label>
          <h2>{errorMessage}</h2>

          <input type="submit" value="Create Account" />
        </form>
      </div>
      <Footer />
    </>
  );
}
