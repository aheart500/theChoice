import React, { useState, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "firebase/auth";
import firebase from "firebase/app";
import UserContext from "../Contexts/User/UserContext";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
const FBProvider = new firebase.auth.FacebookAuthProvider();

const SignIn = () => {
  const { Login } = useContext(UserContext);
  const history = useHistory();
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
  const handleSignUpWithFacebook = () => {
    firebase
      .auth()
      .signInWithPopup(FBProvider)
      .then(() => history.replace("/"))
      .catch((e) => console.log(e));
  };
  return (
    <div className="preTestContianer">
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
        <Button
          variant="contained"
          color="primary"
          style={{
            width: "16%",
          }}
          onClick={handleSignUpWithFacebook}
        >
          Sign In with facebook
        </Button>
      </div>
      <Footer />
    </div>
  );
};
export default SignIn;
