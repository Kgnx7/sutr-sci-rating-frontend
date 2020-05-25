import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import roles from "../constants/roles";
import UserList from "./UserList";
import PositionList from "./PositionList";

export default function Routers() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />

        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          withRoles={[roles.Admin]}
          exact
          path="/"
          component={Dashboard}
        />
        <PrivateRoute
          withRoles={[roles.Admin]}
          exact
          path="/users"
          component={UserList}
        />
        <PrivateRoute
          withRoles={[roles.Admin]}
          exact
          path="/positions"
          component={PositionList}
        />
        <PrivateRoute path="*">404</PrivateRoute>
      </Switch>
    </Router>
  );
}

function PrivateRoute({ children, withRoles, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.user);
  const location = useLocation();

  const hasAccess = Array.isArray(withRoles)
    ? withRoles.some((role) => role === currentUser?.position)
    : true;

  return (
    <Route {...rest}>
      {isAuthenticated && hasAccess ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      )}
    </Route>
  );
}
