import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom'
import Profile from './Profile'
import UsersList from '../features/usersList'
import PositionsList from '../features/positionsList'
// import UserCreate from './UserCreate'
import FacultiesList from '../features/facultiesList'
import FacultyDetails from '../features/facultyDetails'
import DepartmentDetails from '../features/departmentDetails'
import AcademicDegreesList from '../features/academicDegreesList'
import AcademicRanksList from '../features/academicRanksList'
import UserDetails from '../features/userDetails'
import Login from '../features/login'
import Dashboard from '../components/Dashboard'

import groups from '../constants/groups'

export default function Routers() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />

        {/* <PrivateRoute exact path="/profile" component={Profile} /> */}
        <PrivateRoute
          withRoles={[
            ...groups.University,
            ...groups.Faculty,
            ...groups.Department,
            ...groups.Worker,
          ]}
          exact
          path="/users/:id"
          component={UserDetails}
        />
        <PrivateRoute withRoles={groups.University} exact path="/users" component={UsersList} />

        <PrivateRoute exact path="/" render={() => <Dashboard />} />

        <PrivateRoute
          withRoles={groups.University}
          exact
          path="/faculties"
          component={FacultiesList}
        />

        <PrivateRoute
          withRoles={[...groups.University, ...groups.Faculty]}
          exact
          path="/faculties/:id"
          component={FacultyDetails}
        />
        <PrivateRoute
          withRoles={groups.University}
          exact
          path="/positions"
          component={PositionsList}
        />

        <PrivateRoute
          withRoles={groups.University}
          exact
          path="/academicDegrees"
          component={AcademicDegreesList}
        />
        <PrivateRoute
          withRoles={groups.University}
          exact
          path="/academicRanks"
          component={AcademicRanksList}
        />
        <PrivateRoute
          withRoles={[...groups.University, ...groups.Faculty, ...groups.Department]}
          exact
          path="/faculties/:facultyId/departments/:departmentId"
          component={DepartmentDetails}
        />
        {/* 
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          withRoles={groups.University}
          exact
          path="/user/create"
          component={UserCreate}
        />
        */}
        <PrivateRoute path="*">404</PrivateRoute>
      </Switch>
    </Router>
  )
}

function PrivateRoute({ children, withRoles, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const currentUser = useSelector((state) => state.auth.user)
  const location = useLocation()

  const hasAccess = Array.isArray(withRoles)
    ? withRoles.some((role) => role === currentUser?.position)
    : true

  return (
    <Route {...rest}>
      {isAuthenticated && hasAccess ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )}
    </Route>
  )
}
