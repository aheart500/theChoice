import React from "react";
import Header from "./Header";

import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Test from "./Test";
import Main from "./Main";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "80%",
    margin: "2rem auto",
  },
}));

const Admin = () => {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <main className={classes.main}>
        <Router>
          <Route exact path="/admin/test/:id" component={Test} />
          <Route exact path="/admin" component={Main} />
        </Router>
      </main>
    </div>
  );
};

export default Admin;
