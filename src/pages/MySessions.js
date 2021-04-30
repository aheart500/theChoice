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

  return (
    <>
      <Header />
      <div className="pretest-content">
        <h1>Hi, Mohamed!</h1>
        <h3>You don't have any sessions available right now.</h3>
      </div>
      <Footer />
    </>
  );
}
