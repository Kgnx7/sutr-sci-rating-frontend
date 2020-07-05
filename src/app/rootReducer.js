import { combineReducers } from '@reduxjs/toolkit'

import authReducer from '../features/login/authSlice'
import appReducer from './appSlice'
import usersListReducer from '../features/usersList/usersSlice'
import userDetailsReducer from '../features/userDetails/userDetailsSlice'

import facultiesReducer from '../features/facultiesList/facultiesSlice'
import facultyReducer from '../features/facultyDetails/facultySlice'
import facultyCreateReducer from '../features/facultyCreate/facultyCreateSlice'

import departmentsReducer from '../features/departmentsList/departmentsSlice'
import departmentReducer from '../features/departmentDetails/departmentSlice'
import departmentCreateReducer from '../features/departmentCreate/departmentCreateSlice'

import academicRanksReducer from '../features/academicRanksList/academicRanksSlice'
import accessGroupsReducer from '../features/accessGroupsList/accessGroupsSlice'
import positionsReducer from '../features/positionsList/positionsSlice'
import employmentTypesReducer from '../features/employmentTypesList/employmentTypesListSlice'
import degreeTypesListReducer from '../features/degreeTypesList/degreeTypesListSlice'
import specialtiesListReducer from '../features/specialtiesList/specialtiesListSlice'

const rootReducer = combineReducers({
  app: appReducer,

  auth: authReducer,

  usersList: usersListReducer,
  userDetails: userDetailsReducer,

  faculties: facultiesReducer,
  faculty: facultyReducer,
  facultyCreate: facultyCreateReducer,

  departments: departmentsReducer,
  department: departmentReducer,
  departmentCreate: departmentCreateReducer,

  academicRanks: academicRanksReducer,

  accessGroups: accessGroupsReducer,

  positions: positionsReducer,

  employmentTypes: employmentTypesReducer,

  degreeTypesList: degreeTypesListReducer,

  specialtiesList: specialtiesListReducer,
})

export default rootReducer
