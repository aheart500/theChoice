import React, { useState, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserContext from "../Contexts/User/UserContext";
import "firebase/firestore";

import { Link } from "react-router-dom";

const Signup = (props) => {
  const [name, setStudentName] = useState("");
  const [phone, setStudentPhone] = useState();
  const [grade, setStudentGrade] = useState();
  const [email, setStudentEmail] = useState("");
  const [sat, setStudentSat] = useState();
  const [act, setStudentAct] = useState();
  const [est, setStudentEst] = useState();
  const [password, setStudentPassword] = useState("");
  const [confirmPassword, setStudentConfirmPassword] = useState("");
  const [groupCode, setGroupCode] = useState("");

  const { Register } = useContext(UserContext);

  const onFormSubmit = (event) => {
    event.preventDefault();
    Register({ username: email, password, phone, name, grade, sat, act, est, groupCode })
      .then(() => window.location.replace("/"))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Header />
      <div className="signup-form">
        <h1 style={{ marginTop: "100px" }}>Fill in your information to create an account!</h1>
        <h2 style={{ marginBottom: "0px" }}>Already have an account?</h2>
        <Link to="/signin">Click here to log in</Link>
        <form onSubmit={onFormSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(event) => setStudentName(event.target.value)}
              required
            />
          </label>
          <label>
            Phone No:
            <input
              type="phone"
              name="number"
              value={phone}
              onChange={(event) => setStudentPhone(event.target.value)}
              required
            />
          </label>
          <label>
            Grade:
            <input
              type="number"
              name="grade"
              value={grade}
              onChange={(event) => setStudentGrade(event.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setStudentEmail(event.target.value)}
              required
            />
          </label>
          <label>
            What's your highest SAT score?
            <input
              type="number"
              name="satScore"
              value={sat}
              onChange={(event) => setStudentSat(event.target.value)}
            />
          </label>
          <label>
            What's your highest ACT score?
            <input
              type="number"
              name="actScore"
              value={act}
              onChange={(event) => setStudentAct(event.target.value)}
            />
          </label>
          <label>
            What's your highest EST score?
            <input
              type="number"
              name="estScore"
              value={est}
              onChange={(event) => setStudentEst(event.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setStudentPassword(event.target.value)}
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmpassword"
              value={confirmPassword}
              onChange={(event) => setStudentConfirmPassword(event.target.value)}
            />
          </label>
          <label>
            Group Code:
            <input
              name="code"
              value={groupCode}
              onChange={(event) => setGroupCode(event.target.value)}
            />
          </label>

          <input type="submit" value="Create Account" />
        </form>
      </div>
      <Footer />
    </>
  );
};
export default Signup;
