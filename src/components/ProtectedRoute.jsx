import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import UserContext from "../Contexts/User/UserContext";
const ProtectedRoute = ({ component: Component, onlyAdmin, ...rest }) => {
  const {
    userState: { isLoggedIn, isAdmin },
  } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin ? (
          <Component {...props} />
        ) : !onlyAdmin && isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
export default ProtectedRoute;
