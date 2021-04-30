import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import React, { useReducer, useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
export default function UserState({ children }) {
  const [loading, setLoading] = useState(true);
  const initialState = {
    isLoggedIn: false,
    isAdmin: false,
    name: "",
    id: "",
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    let loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) loggedUser = JSON.parse(loggedUser);
    if (loggedUser) {
      dispatch({
        type: "LOGIN",
        payload: loggedUser,
      });
    }
    setLoading(false);
  }, []);

  const Login = ({ username, password }) => {
    if (username === "admin" && password === "20202020") {
      const user = { name: "admin", id: 1 };
      localStorage.setItem("loggedUser", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: user });
      return true;
    }
    return false;
  };

  const Logout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <UserContext.Provider
      value={{
        userState: state,
        Login,
        Logout,
      }}
    >
      {loading ? <Loader /> : children}
    </UserContext.Provider>
  );
}
