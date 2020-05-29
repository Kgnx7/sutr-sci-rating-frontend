import React from "react";
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
import UserCreate from "./UserCreate";
import FacultyList from "./FacultyList";
import FacultyShow from "./FacultyShow";
import DepartmentShow from "./DepartmentShow";

import groups from "../constants/groups";

export default function Routers() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />

        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute
          withRoles={groups.University}
          exact
          path="/users"
          component={UserList}
        />
        <PrivateRoute
          withRoles={[roles.Admin]}
          exact
          path="/user/create"
          component={UserCreate}
        />
        <PrivateRoute
          withRoles={groups.University}
          exact
          path="/positions"
          component={PositionList}
        />
        <PrivateRoute
          withRoles={groups.University}
          exact
          path="/faculties"
          component={FacultyList}
        />
        <PrivateRoute
          withRoles={groups.University}
          exact
          path="/faculties/:id"
          component={FacultyShow}
        />
        <PrivateRoute
          withRoles={groups.University}
          exact
          path="/departments/:id"
          component={DepartmentShow}
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
