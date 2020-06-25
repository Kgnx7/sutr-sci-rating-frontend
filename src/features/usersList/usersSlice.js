import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllUsers, apiCreateUser, apiDeleteUser } from '../../api/usersAPI'
import { enqueueSnackbar } from '../../app/appSlice'
import { handleServerErrors } from '../../utils/errorHandler'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], isLoading: false, error: null },
  reducers: {
    getUsersStart: startLoading,
    getUsersFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getUsersSuccess(state, { payload }) {
      // TODO: валидация данных
      state.users = payload.users
      state.count = payload.count
      state.isLoading = false
      state.error = null
    },
  },
})

export const { getUsersStart, getUsersFailure, getUsersSuccess, resetError } = usersSlice.actions

export const getAllUsers = (search, offset, limit, router) => async (dispatch) => {
  try {
    dispatch(getUsersStart())

    const { users, count } = await apiGetAllUsers(search, offset, limit)

    dispatch(getUsersSuccess({ users, count }))
  } catch (error) {
    dispatch(getUsersFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default usersSlice.reducer
