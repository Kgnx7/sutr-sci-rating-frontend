import { combineReducers } from '@reduxjs/toolkit'

import authReducer from './authSlice'
import usersReducer from './usersSlice'
import positionsSlice from './positionsSlice'
import appReducer from './appSlice'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  users: usersReducer,
  positions: positionsSlice,
})

export default rootReducer
