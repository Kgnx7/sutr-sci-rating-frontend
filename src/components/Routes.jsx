import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom'

import Dashboard from '../components/Dashboard'
import NotFound from '../components/NotFound'
import { AbilityContext } from '../components/Can'

import { enqueueSnackbar } from '../app/appSlice'

import UsersList from '../features/usersList'
import UserDetails from '../features/userDetails'
import UserEdit from '../features/userEdit'
import UserCreate from '../features/userCreate'
import Login from '../features/login'
import FacultiesList from '../features/facultiesList'
import FacultyDetails from '../features/facultyDetails'
import DepartmentDetails from '../features/departmentDetails'
import DepartmentCreate from '../features/departmentCreate'
import DepartmentEdit from '../features/departmentEdit'
import UserStatusCreate from '../features/userStatusCreate'
import AcademicDegreeCreate from '../features/academicDegreeCreate'
import FacultyCreate from '../features/facultyCreate'
import FacultyEdit from '../features/facultyEdit'
import RiaTypesList from '../features/riaTypesList'
import RiaTypeDetails from '../features/riaTypeDetails'
import RiaTypeCreate from '../features/riaTypeCreate'
import RiaTypeEdit from '../features/riaTypeEdit'
import RiaTypePropertyCreate from '../features/riaTypeEdit/RiaTypePropertyCreate'
import RiaSpecificationsList from '../features/riaSpecificationsList'
import RiaSpecificationCreate from '../features/riaSpecificationCreate'
import RiaDetails from '../features/riaDetails'
import RiaCreate from '../features/riaCreate'
import RiaPropertyCreate from '../features/riaEdit/RiaPropertyCreate'

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
          action="create"
          source="Faculty"
          path="/faculties/create"
          component={FacultyCreate}
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
          source="Faculty"
          path="/faculties/:id/edit"
          component={FacultyEdit}
        />
        <PrivateRoute
          exact
          action="get"
          source="Department"
          path="/departments/create"
          component={DepartmentCreate}
        />
        <PrivateRoute
          exact
          action="get"
          source="Department"
          path="/departments/:id/edit"
          component={DepartmentEdit}
        />
        <PrivateRoute
          exact
          action="get"
          source="Department"
          path="/departments/:id"
          component={DepartmentDetails}
        />
        <PrivateRoute
          exact
          action="list"
          source="RiaType"
          path="/riaTypes"
          component={RiaTypesList}
        />
        <PrivateRoute
          exact
          action="list"
          source="RiaType"
          path="/riaTypes/create"
          component={RiaTypeCreate}
        />
        <PrivateRoute
          exact
          action="edit"
          source="RiaType"
          path="/riaTypes/edit/:id"
          component={RiaTypeEdit}
        />
        <PrivateRoute
          exact
          action="edit"
          source="RiaType"
          path="/riaTypes/:id/addProperty"
          component={RiaTypePropertyCreate}
        />
        <PrivateRoute
          exact
          action="get"
          source="RiaType"
          path="/riaTypes/get/:id"
          component={RiaTypeDetails}
        />
        <PrivateRoute
          exact
          action="list"
          source="RiaSpecification"
          path="/riaSpecifications"
          component={RiaSpecificationsList}
        />
        <PrivateRoute
          exact
          action="create"
          source="RiaSpecification"
          path="/riaSpecifications/create"
          component={RiaSpecificationCreate}
        />
        <PrivateRoute exact action="get" source="Ria" path="/ria/get/:id" component={RiaDetails} />
        <PrivateRoute
          exact
          action="edit"
          source="Ria"
          path="/ria/:id/addProperty"
          component={RiaPropertyCreate}
        />
        <PrivateRoute exact action="create" source="Ria" path="/ria/create" component={RiaCreate} />
        <PrivateRoute path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}

function PrivateRoute({ children, action, source, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const location = useLocation()
  // const history = useHistory()
  // const dispatch = useDispatch()
  const ability = useContext(AbilityContext)

  const hasAccess = ability.can(action, source)

  // if (!hasAccess && location.pathname !== '/login') {
  //   dispatch(enqueueSnackbar('Нет доступа', 'error'))
  // }

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
