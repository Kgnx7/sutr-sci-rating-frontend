import { createSlice } from '@reduxjs/toolkit'
import { signOut } from './authSlice';
import { apiGetUsersByDepartment } from '../api/usersAPI';
import { apiGetFacultyDepartments } from '../api/facultiesAPI';
import { apiGetAllDepartments } from '../api/departmentsAPI';
import { enqueueSnackbar } from './appSlice';

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const departmentsSlice = createSlice({
  name: 'departments',
  initialState: { departments: [], staff: [], isLoading: false, error: null },
  reducers: {
    getDepartmentsStart: startLoading,
    getDepartmentsFailure: loadingFailed,

    resetError(state) {
      state.error = null;
    },
    getDepartmentsSuccess(state, { payload }) {
      // TODO: валидация данных
      state.departments = payload;
      state.isLoading = false
      state.error = null
    },
    getDepartmentStaffSuccess(state, { payload }) {
      // TODO: валидация данных
      state.staff = payload;
      state.isLoading = false
      state.error = null
    },
  },
});

export const {
  getDepartmentsStart,
  getDepartmentsFailure,
  getDepartmentsSuccess,
  getDepartmentStaffSuccess,
  resetError,
} = departmentsSlice.actions

export const getAllDepartments = (router) => async dispatch => {
  try {
    dispatch(getDepartmentsStart())

    const departments = await apiGetAllDepartments();

    dispatch(getDepartmentsSuccess(departments))

  } catch (error) {

    if (error.response) {
      if (error.response.status === 401) {
        dispatch(signOut());
        router.push('/login');
      } else {
        dispatch(enqueueSnackbar('Что-то пошло не так', 'error'));
      }
    } else if (error.request) {
      dispatch(enqueueSnackbar('Нет ответа от сервера', 'error'));
    }
    dispatch(getDepartmentsFailure(error));
  }
}

export const getFacultyDepartments = (id, router) =>
  async dispatch => {
    try {
      dispatch(getDepartmentsStart())

      const departments = await apiGetFacultyDepartments(id);

      dispatch(getDepartmentsSuccess(departments))

    } catch (error) {

      if (error.response) {
        if (error.response.status === 401) {
          dispatch(signOut());
          router.push('/login');
        } else {
          dispatch(enqueueSnackbar('Что-то пошло не так', 'error'));
        }
      } else if (error.request) {
        dispatch(enqueueSnackbar('Нет ответа от сервера', 'error'));
      }
      dispatch(getDepartmentsFailure(error));
    }
  }

export const getStaff = (departmentId, router) =>
  async dispatch => {
    try {
      dispatch(getDepartmentsStart())

      const staff = await apiGetUsersByDepartment(departmentId)

      dispatch(getDepartmentStaffSuccess(staff))

    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(signOut());
          router.push('/login');
        } else {
          dispatch(enqueueSnackbar('Что-то пошло не так', 'error'));
        }
      } else if (error.request) {
        dispatch(enqueueSnackbar('Нет ответа от сервера', 'error'));
      }
      dispatch(getDepartmentsFailure(error));
    }
  }


export default departmentsSlice.reducer;