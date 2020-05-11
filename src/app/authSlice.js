import { createSlice } from '@reduxjs/toolkit'
import { apiLogin, apiLogout } from '../api/authAPI';

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

    getUserSuccess(state, { payload }) {
      state.user = payload
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
    }
  },
});

export const {
  getUserStart,
  getUserFailure,
  getUserSuccess,
} = authSlice.actions

export const login = (email, password, redirect) =>
  async dispatch => {
    try {
      dispatch(getUserStart())
      
      const user = await apiLogin(email, password)
      
      dispatch(getUserSuccess(user))
      redirect();

    } catch (err) {
      dispatch(getUserFailure(err))
    }
  }

export const logout = (redirect) =>
  async dispatch => {
    try {
      
      await apiLogout();
      
      redirect();

    } catch (err) {
      console.log(err);
    }
  }

export default authSlice.reducer;