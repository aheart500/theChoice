import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import React, { useReducer, useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import firebase from "firebase/app";
import { generateUserDocument, addToUserData } from "../../services/user";

export default function UserState({ children }) {
  const [loading, setLoading] = useState(true);

  const initialState = {
    isLoggedIn: false,
    isAdmin: false,
    name: "",
    uid: "",
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth);
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      }
      setLoading(false);
    });
  }, []);

  const Login = async ({ username, password }) => {
    if (username && password) {
      await firebase
        .auth()
        .signInWithEmailAndPassword(username, password)
        .catch((err) => console.log("error"));
    }
  };
  const UpdateUser = async (userId, data) => {
    addToUserData(userId, data)
      .then(() => {
        dispatch({ type: "UPDATE", payload: data });
      })
      .catch((e) => console.log(e));
  };
  const Register = async ({ username, password, ...additionalData }) => {
    try {
      const { user } = await firebase.auth().createUserWithEmailAndPassword(username, password);
      await generateUserDocument(user, additionalData);
    } catch (error) {
      console.log(error);
    }
  };
  const Logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => dispatch({ type: "LOGOUT" }))
      .catch((e) => console.log(e));
  };
  const AddTest = (test) => {
    dispatch({ type: "TEST", payload: test });
  };
  return (
    <UserContext.Provider
      value={{
        userState: state,
        Login,
        Logout,
        Register,
        AddTest,
        UpdateUser,
      }}
    >
      {loading ? <Loader /> : children}
    </UserContext.Provider>
  );
}
