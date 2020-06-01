import { createSlice } from '@reduxjs/toolkit'
import { apiGetUser } from '../../api/usersAPI'
import { handleServerErrors } from '../../utils/errorHandler'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: { user: null, isLoading: false, error: null },
  reducers: {
    getUserStart: startLoading,
    getUserFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getUserSuccess(state, { payload }) {
      // TODO: валидация данных
      state.user = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const { getUserStart, getUserFailure, getUserSuccess, resetError } = userDetailsSlice.actions

export const getUser = (id, router) => async (dispatch) => {
  try {
    dispatch(getUserStart())

    const user = await apiGetUser(id)

    dispatch(getUserSuccess(user))
  } catch (error) {
    dispatch(getUserFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default userDetailsSlice.reducer
