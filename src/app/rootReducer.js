import { combineReducers } from '@reduxjs/toolkit'

import authReducer from '../features/login/authSlice'
import appReducer from './appSlice'
import usersListReducer from '../features/usersList/usersSlice'
import userDetailsReducer from '../features/userDetails/userDetailsSlice'
import facultiesReducer from '../features/facultiesList/facultiesSlice'
import facultyReducer from '../features/facultyDetails/facultySlice'
import departmentsReducer from '../features/departmentsList/departmentsSlice'
import departmentReducer from '../features/departmentDetails/departmentSlice'
// import positionsReducer from '../features/positionsList/positionsSlice'
// import academicDegreesReducer from '../features/academicDegreesList/academicDegreesSlice'
// import academicRanksReducer from '../features/academicRanksList/academicRanksSlice'
// import staffsReducer from '../features/staffsList/staffsSlice'
// import researchWorksReducer from '../features/researchWorksList/researchWorksSlice'
// import researchWorkReducer from '../features/researchWorkDetails/researchWorkDetailsSlice'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  usersList: usersListReducer,
  userDetails: userDetailsReducer,
  faculties: facultiesReducer,
  faculty: facultyReducer,
  departments: departmentsReducer,
  department: departmentReducer,

  // positions: positionsReducer,
  // academicRanks: academicRanksReducer,
})

export default rootReducer
