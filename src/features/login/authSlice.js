import { createSlice } from '@reduxjs/toolkit'
import { apiLogin, apiLogout } from '../../api/authAPI'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, user: null, isLoading: false, error: null },
  reducers: {
    getUserStart: startLoading,
    getUserFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getUserSuccess(state, { payload }) {
      state.user = payload
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
    },
  },
})

export const { getUserStart, getUserFailure, getUserSuccess, resetError } = authSlice.actions

export const signIn = (login, password, redirect) => async (dispatch) => {
  try {
    dispatch(getUserStart())

    const user = await apiLogin(login, password)

    dispatch(getUserSuccess(user))
    redirect()
  } catch (err) {
    dispatch(getUserFailure(err))
    dispatch(enqueueSnackbar(err.response?.data?.message || 'Что-то пошло не так', 'error'))
  }
}

export const signOut = (redirect) => async (dispatch) => {
  try {
    await apiLogout()

    redirect()
  } catch (err) {
    console.log(err)
  }
}

export default authSlice.reducer
