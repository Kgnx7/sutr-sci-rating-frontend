import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllUsers } from '../api/usersAPI';
import { signOut } from './authSlice';

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
      state.error = null;
    },
    getUsersSuccess(state, { payload }) {
      // TODO: валидация данных
      state.users = payload;
      state.isLoading = false
      state.error = null
    }
  },
});

export const {
  getUsersStart,
  getUsersFailure,
  getUsersSuccess,
  resetError,
} = usersSlice.actions

export const getAllUsers = (router) =>
  async dispatch => {
    try {
      dispatch(getUsersStart())

      const users = await apiGetAllUsers()

      dispatch(getUsersSuccess(users))

    } catch (err) {

      if (err.response.status === 401) {
        dispatch(signOut());
        router.push('/login');
      }

      dispatch(getUsersFailure(err));
    }
  }

export default usersSlice.reducer;