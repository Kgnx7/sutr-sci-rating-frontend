import { combineReducers } from '@reduxjs/toolkit'

import authReducer from './authSlice'
// import repoDetailsReducer from 'features/repoSearch/repoDetailsSlice'
// import issuesReducer from 'features/issuesList/issuesSlice'
// import commentsReducer from 'features/issueDetails/commentsSlice'

const rootReducer = combineReducers({
  auth: authReducer,
})

export default rootReducer
