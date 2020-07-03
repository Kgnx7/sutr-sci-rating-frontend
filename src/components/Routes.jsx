import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom'
import UsersList from '../features/usersList'
import UserDetails from '../features/userDetails'
import UserEdit from '../features/userEdit'
import UserCreate from '../features/userCreate'
import Login from '../features/login'
import FacultiesList from '../features/facultiesList'
import FacultyDetails from '../features/facultyDetails'
import DepartmentDetails from '../features/departmentDetails'
import Dashboard from '../components/Dashboard'
import NotFound from '../components/NotFound'
import { AbilityContext } from '../components/Can'
import UserStatusCreate from '../features/userStatusCreate'
import AcademicDegreeCreate from '../features/academicDegreeCreate'

export default function Routers() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact action="get" source="User" path="/" render={() => <Dashboard />} />
        <PrivateRoute
          action="create"
          source="User"
          exact
          path="/users/create"
          component={UserCreate}
        />
        <PrivateRoute
          action="edit"
          source="User"
          exact
          path="/users/:id/edit"
          component={UserEdit}
        />
        <PrivateRoute
          exact
          action="get"
          source="User"
          path="/users/get/:id"
          component={UserDetails}
        />
        <PrivateRoute
          exact
          action="create"
          source="UserStatus"
          path="/users/:id/statuses/create"
          component={UserStatusCreate}
        />
        <PrivateRoute
          exact
          action="create"
          source="AcademicDegree"
          path="/users/:id/academicdegrees/create"
          component={AcademicDegreeCreate}
        />
        <PrivateRoute exact action="list" source="User" path="/users" component={UsersList} />
        <PrivateRoute
          exact
          action="list"
          source="Faculty"
          path="/faculties"
          component={FacultiesList}
        />
        <PrivateRoute
          exact
          action="get"
          source="Faculty"
          path="/faculties/:id"
          component={FacultyDetails}
        />
        <PrivateRoute
          exact
          action="get"
          source="Departments"
          path="/departments/:id"
          component={DepartmentDetails}
        />

        {/* <PrivateRoute
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
          path="/researchWorks"
          component={ResearchWorksList}
        />
        <PrivateRoute
          withRoles={[...groups.University, ...groups.Faculty, ...groups.Department]}
          exact
          path="/researchWorks/create"
          component={ResearchWorkCreate}
        />
        <PrivateRoute
          withRoles={[...groups.University, ...groups.Faculty, ...groups.Department]}
          exact
          path="/researchWorks/:id"
          component={ResearchWorkDetails}
        />
        <PrivateRoute
          withRoles={[...groups.University, ...groups.Faculty, ...groups.Department]}
          exact
          path="/rating"
          component={SciRating}
        /> */}
        {/*  */}

        {/* 

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

function PrivateRoute({ children, action, source, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const location = useLocation()
  const ability = useContext(AbilityContext)

  const hasAccess = ability.can(action, source)

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
