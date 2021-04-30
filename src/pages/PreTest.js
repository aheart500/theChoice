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

export default function PreTest(props) {
  const history = useHistory();
  const test = props.history.location.test;

  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [testa, setTesta] = useState("");
  const onFormSubmit = (event) => {
    firebase
      .firestore()
      .collection("test1solutions")
      .doc(studentName)
      .set({
        phone: studentPhone,
      })
      .then(() => {
        setTesta("Success.... Please wait");
        history.push({
          pathname: "/test",
          name: studentName,
          phone: studentPhone,
        });
      })
      .catch((error) => setTesta(error));
    event.preventDefault();
  };
  const onForm = (event) => {
    history.push({
      pathname: "/test",
      name: studentName,
      phone: studentPhone,
    });
  };
  return (
    <>
      <Header />
      <div className="pretest-content">
        <div className="test-title">
          <img src={test} width="200px" />
          <h1>Practice Test</h1>
        </div>
        <div className="modal-content">
          <h1>Hi Mohamed!</h1>
          <a onClick={onForm}>Start Test</a>
        </div>
        {/*
        <div className="modal-content">
          <p>Please fill in this info</p>
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
            <input type="submit" value="Start Test" />
          </form>
          <h1>{testa}</h1>
        </div>
        */}
      </div>
      <Footer />
    </>
  );
}
