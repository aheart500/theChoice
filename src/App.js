import React from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import { firebaseConfig } from "./firebaseConfig";

import UserState from "./Contexts/User/UserState";
import Routes from "./Routes";

function App() {
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  return (
    <UserState>
      <Routes />
    </UserState>
  );
}

export default App;
