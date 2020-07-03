import { createSlice } from '@reduxjs/toolkit'
import { apiGetUser, apiDeleteUser } from '../../api/usersAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

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

    deleteUserStart: startLoading,
    deleteUserFailure: loadingFailed,

    editUserStart: startLoading,
    editUserFailure: loadingFailed,

    resetError(state) {
      state.error = null
    },

    getUserSuccess(state, { payload }) {
      state.user = payload
      state.isLoading = false
      state.error = null
    },
    editUserSuccess(state, { payload }) {
      state.user = payload
      state.isLoading = false
      state.error = null
    },
    deleteUserSuccess(state) {
      state.user = null
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getUserStart,
  getUserFailure,
  deleteUserStart,
  deleteUserFailure,
  editUserStart,
  editUserFailure,
  getUserSuccess,
  editUserSuccess,
  deleteUserSuccess,
  resetError,
} = userDetailsSlice.actions

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

export const deleteUser = (id, router) => async (dispatch) => {
  try {
    dispatch(deleteUserStart())

    await apiDeleteUser(id)

    dispatch(deleteUserSuccess())
    router.push(`/users`)
    dispatch(enqueueSnackbar('Пользователь успешно удален', 'success'))
  } catch (error) {
    dispatch(deleteUserFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default userDetailsSlice.reducer
