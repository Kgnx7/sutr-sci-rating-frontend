import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom'
// import Profile from './Profile'
import UsersList from '../features/usersList'
import PositionsList from '../features/positionsList'
import PositionCreate from '../features/positionCreate'
import UserEdit from '../features/userEdit'
import FacultiesList from '../features/facultiesList'
import FacultyDetails from '../features/facultyDetails'
import FacultyCreate from '../features/facultyCreate'
import DepartmentDetails from '../features/departmentDetails'
import AcademicDegreesList from '../features/academicDegreesList'
import AcademicDegreeCreate from '../features/academicDegreeCreate'
import AcademicRanksList from '../features/academicRanksList'
import AcademicRankCreate from '../features/academicRankCreate'
import UserDetails from '../features/userDetails'
import Login from '../features/login'
import Dashboard from '../components/Dashboard'
import NotFound from '../components/NotFound'

import groups from '../constants/groups'

export default function Routers() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" render={() => <Dashboard />} />
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
        <PrivateRoute
          withRoles={groups.University}
          exact
          path="/user/:id/edit"
          component={UserEdit}
        />
        <PrivateRoute withRoles={groups.University} exact path="/users" component={UsersList} />

        <PrivateRoute
          withRoles={groups.University}
          exact
          path="/positions"
          component={PositionsList}
        />

        <PrivateRoute
          withRoles={groups.University}
          exact
          path="/positions/create"
          component={PositionCreate}
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
          path="/academicDegrees/create"
          component={AcademicDegreeCreate}
        />
        <PrivateRoute
          withRoles={groups.University}
          exact
          path="/academicRanks"
          component={AcademicRanksList}
        />
        <PrivateRoute
          withRoles={groups.University}
          exact
          path="/academicRanks/create"
          component={AcademicRankCreate}
        />
        <PrivateRoute
          withRoles={groups.University}
          exact
          path="/faculties"
          component={FacultiesList}
        />
        <PrivateRoute
          withRoles={[...groups.University, ...groups.Faculty]}
          exact
          path="/faculties/create"
          component={FacultyCreate}
        />
        <PrivateRoute
          withRoles={[...groups.University, ...groups.Faculty]}
          exact
          path="/faculties/:id"
          component={FacultyDetails}
        />
        <PrivateRoute
          withRoles={[...groups.University, ...groups.Faculty, ...groups.Department]}
          exact
          path="/departments/:id"
          component={DepartmentDetails}
        />
        {/* <PrivateRoute
          withRoles={groups.University}
          exact
          path="/user/create"
          component={UserCreate}
        /> */}

        {/* 

        <PrivateRoute
          withRoles={[...groups.University, ...groups.Faculty]}
          exact
          path="/faculties/:id"
          component={FacultyDetails}
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
        /> */}
        {/* 
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          withRoles={groups.University}
          exact
          path="/user/create"
          component={UserCreate}
        />
        */}
        <PrivateRoute path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}

function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const currentUser = useSelector((state) => state.auth.user)
  const location = useLocation()

  const hasAccess = true

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
