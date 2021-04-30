import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import UserContext from "../Contexts/User/UserContext";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    userState: { isLoggedIn },
  } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => (isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};
export default ProtectedRoute;
