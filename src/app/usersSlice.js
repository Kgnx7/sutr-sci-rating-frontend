import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllUsers, apiCreateUser, apiDeleteUser } from '../api/usersAPI';
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
    createUserStart: startLoading,
    deleteUserStart: startLoading,
    getUsersFailure: loadingFailed,
    createUserFailure: loadingFailed,
    deleteUserFailure: loadingFailed,
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
    createUserSuccess(state, { payload }) {
      // TODO: валидация данных
      state.users = [...state.users, payload];
      state.isLoading = false
      state.error = null
    },
    deleteUserSuccess(state, { payload }) {
      // TODO: валидация данных
      state.users = state.users.filter(user => user.id === payload);
      state.isLoading = false
      state.error = null
    },
  },
});

export const {
  getUsersStart,
  createUserStart,
  deleteUserStart,
  getUsersFailure,
  createUserFailure,
  deleteUserFailure,
  getUsersSuccess,
  createUserSuccess,
  deleteUserSuccess,
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

export const createUser = (user, router) =>
  async dispatch => {
    try {
      dispatch(createUserStart())

      const newUser = await apiCreateUser(user);

      dispatch(createUserSuccess(newUser))
      dispatch(enqueueSnackbar('Пользователь успешно добавлен', 'success'));
      router.push('/users');

    } catch (error) {

      if (error.response) {
        if (error.response.status === 401) {
          dispatch(signOut());
          router.push('/login');
        }
      } else if (error.request) {
        dispatch(enqueueSnackbar('Нет ответа от сервера', 'error'));
      }
      dispatch(createUserFailure(error));
    }
  }

export const deleteUser = (userId, router) =>
  async dispatch => {
    try {
      dispatch(deleteUserStart())

      const responce = await apiDeleteUser(userId);

      dispatch(deleteUserSuccess(userId))
      dispatch(enqueueSnackbar(responce.message || 'Пользователь успешно удален', 'success'));
      router.push('/users');

    } catch (error) {

      if (error.response) {
        if (error.response.status === 401) {
          dispatch(signOut());
          router.push('/login');
        }
      } else if (error.request) {
        dispatch(enqueueSnackbar('Нет ответа от сервера', 'error'));
      }
      dispatch(deleteUserFailure(error));
    }
  }

export default usersSlice.reducer;