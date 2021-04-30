import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserState from "./Contexts/User/UserState";
import "react-notifications-component/dist/theme.css";
import ReactNotification from "react-notifications-component";
ReactDOM.render(
  <React.StrictMode>
    <UserState>
      <ReactNotification />
      <App />
    </UserState>
  </React.StrictMode>,
  document.getElementById("root")
);
