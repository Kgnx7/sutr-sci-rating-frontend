import { createSlice } from '@reduxjs/toolkit'
import { apiGetUsersByDepartment } from '../api/usersAPI';
import { apiGetFacultyDepartments } from '../api/facultiesAPI';
import { apiGetAllDepartments } from '../api/departmentsAPI';
import { handleServerErrors } from '../utils/errorHandler';

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
    dispatch(getDepartmentsFailure(error));
    handleServerErrors(error, router, dispatch);
  }
}

export const getFacultyDepartments = (id, router) =>
  async dispatch => {
    try {
      dispatch(getDepartmentsStart())

      const departments = await apiGetFacultyDepartments(id);

      dispatch(getDepartmentsSuccess(departments))

    } catch (error) {
      dispatch(getDepartmentsFailure(error));
      handleServerErrors(error, router, dispatch);
    }
  }

export const getStaff = (departmentId, router) =>
  async dispatch => {
    try {
      dispatch(getDepartmentsStart())

      const staff = await apiGetUsersByDepartment(departmentId)

      dispatch(getDepartmentStaffSuccess(staff))

    } catch (error) {
      dispatch(getDepartmentsFailure(error));
      handleServerErrors(error, router, dispatch);
    }
  }


export default departmentsSlice.reducer;