import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Test from "./pages/Test";
import PreTest from "./pages/PreTest";
import Tutoring from "./pages/Tutoring";
import Home from "./pages/Home";
import MyAccount from "./pages/MyAccount";
import MySessions from "./pages/MySessions";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

import { firebaseConfig } from "./firebaseConfig";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/Admin/Login";
import AdminPage from "./pages/Admin/Admin";
function App() {
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/pretest" component={PreTest} />
        <Route path="/test" component={Test} />
        <Route path="/tutoring" component={Tutoring} />
        <Route path="/mysessions" component={MySessions} />
        <Route path="/myaccount" component={MyAccount} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={SignIn} />
        <Route path="/login" component={LoginPage} />
        <ProtectedRoute path="/admin" component={AdminPage} />
      </Switch>
    </Router>
  );
}

export default App;
