import { combineReducers } from '@reduxjs/toolkit'

import authReducer from '../features/login/authSlice'
import usersListReducer from '../features/usersList/usersSlice'
import userDetailsReducer from '../features/userDetails/userDetailsSlice'
import positionsReducer from '../features/positionsList/positonsSlice'
import appReducer from './appSlice'
import facultiesReducer from '../features/facultiesList/facultiesSlice'
import facultyReducer from '../features/facultyDetails/facultySlice'
import departmentReducer from '../features/departmentDetails/departmentSlice'
import academicDegreesReducer from '../features/academicDegreesList/academicDegreesSlice'
import academicRanksReducer from '../features/academicRanksList/academicRanksSlice'
import staffsReducer from '../features/staffsList/staffsSlice'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  usersList: usersListReducer,
  userDetails: userDetailsReducer,
  positions: positionsReducer,
  faculties: facultiesReducer,
  faculty: facultyReducer,
  department: departmentReducer,
  academicDegrees: academicDegreesReducer,
  academicRanks: academicRanksReducer,
  staffs: staffsReducer,
})

export default rootReducer
