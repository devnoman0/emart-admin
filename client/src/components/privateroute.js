import React from "react";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("jwtToken");
  return (
    <Route
      {...rest}
      render={props =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
