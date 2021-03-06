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
    authUserStart: startLoading,
    authUserFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    authUserSuccess(state, { payload }) {
      state.user = payload
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
    },
    logout(state) {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const {
  authUserStart,
  authUserFailure,
  authUserSuccess,
  resetError,
  logout,
} = authSlice.actions

export const signIn = (login, password, redirect) => async (dispatch) => {
  try {
    dispatch(authUserStart())

    const user = await apiLogin(login, password)

    dispatch(authUserSuccess(user))
    redirect()
  } catch (err) {
    dispatch(authUserFailure(err))
    dispatch(enqueueSnackbar(err.response?.data?.message || 'Что-то пошло не так', 'error'))
  }
}

export const signOut = (redirect) => async (dispatch) => {
  try {
    await apiLogout()

    dispatch(logout())
    redirect()
  } catch (err) {
    dispatch(authUserFailure(err))
    dispatch(enqueueSnackbar(err.response?.data?.message || 'Что-то пошло не так', 'error'))
  }
}

export default authSlice.reducer
