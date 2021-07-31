import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/Admin/Login";
import AdminPage from "./pages/Admin/Admin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Test from "./pages/Test/Test.jsx";
import PreTest from "./pages/PreTest";
import Tutoring from "./pages/Tutoring";
import Home from "./pages/Home/index";
import MyAccount from "./pages/MyAccount/index";

import MySessions from "./pages/MySessions";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Student from "./pages/Student";
import Review from "./pages/Review";
import Reviews from "./pages/Reviews";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/pretest" component={PreTest} />
        <ProtectedRoute exact path="/test/:id" component={Test} />
        <Route exact path="/student/:id" component={Student} />
        <Route path="/tutoring" component={Tutoring} />
        <Route path="/mysessions" component={MySessions} />
        <Route exact path="/review" component={Review} />
        <Route exact path="/reviews" component={Reviews} />
        <Route exact path="/myaccount" component={MyAccount} />
        <Route exact path="/myaccount/edit" component={(props) => <Signup {...props} edit />} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={SignIn} />
        <Route path="/login" component={LoginPage} />
        <ProtectedRoute onlyAdmin path="/admin" component={AdminPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
