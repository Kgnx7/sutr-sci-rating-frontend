import { combineReducers } from '@reduxjs/toolkit'

import authReducer from './authSlice'
import usersReducer from './usersSlice'
import positionsSReducer from './positionsSlice'
import appReducer from './appSlice'
import facultiesReducer from './facultiesSlice'
import departmentsReducer from './departmentsSlice'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  users: usersReducer,
  positions: positionsSReducer,
  faculties: facultiesReducer,
  departments: departmentsReducer,
})

export default rootReducer
