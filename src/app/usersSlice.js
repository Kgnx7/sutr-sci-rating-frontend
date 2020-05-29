import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllUsers } from '../api/usersAPI';
import { signOut } from './authSlice';
import { enqueueSnackbar } from './appSlice';

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
      state.users = payload.users;
      state.count = payload.count;
      state.isLoading = false
      state.error = null
    },
  },
});

export const {
  getUsersStart,
  getUsersFailure,
  getUsersSuccess,
  resetError,
} = usersSlice.actions

export const getAllUsers = (search, offset, limit, router) =>
  async dispatch => {
    try {
      dispatch(getUsersStart())

      const { users, count } = await apiGetAllUsers(search, offset, limit);

      dispatch(getUsersSuccess({ users, count }))

    } catch (error) {

      if (error.response) {
        if (error.response.status === 401) {
          dispatch(signOut());
          router.push('/login');
        }
      } else if (error.request) {
        dispatch(enqueueSnackbar('Нет ответа от сервера', 'error'));
      }
      dispatch(getUsersFailure(error));
    }
  }

export default usersSlice.reducer;