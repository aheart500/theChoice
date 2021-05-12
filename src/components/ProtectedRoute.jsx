import React, { useContext, useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import UserContext from "../Contexts/User/UserContext";
const ProtectedRoute = ({ component: Component, onlyAdmin, ...rest }) => {
  const history = useHistory();
  const { userState } = useContext(UserContext);
  const { isLoggedIn, isAdmin } = userState;
  useEffect(() => {
    if (
      !userState.isAdmin &&
      userState.isLoggedIn &&
      ["google", "facebook"].includes(userState.provider) &&
      !userState.parentNumber
    ) {
      history.push("/signup");
    }
  }, [userState, history]);
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
