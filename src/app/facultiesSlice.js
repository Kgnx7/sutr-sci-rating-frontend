import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllFaculties, apiGetFacultyDepartments } from '../api/facultiesAPI';
import { handleServerErrors } from '../utils/errorHandler';

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const facultiesSlice = createSlice({
  name: 'faculties',
  initialState: { faculties: [], departments: [], isLoading: false, error: null },
  reducers: {
    getFacultiesStart: startLoading,
    getFacultiesFailure: loadingFailed,
    getFacultyDepartmentsStart: startLoading,
    getFacultyDepartmentsFailure: loadingFailed,

    resetError(state) {
      state.error = null;
    },
    getFacultiesSuccess(state, { payload }) {
      // TODO: валидация данных
      state.faculties = payload;
      state.isLoading = false
      state.error = null
    },
    getFacultyDepartmentsSuccess(state, { payload }) {
      // TODO: валидация данных
      state.departments = payload;
      state.isLoading = false
      state.error = null
    }
  },
});

export const {
  getFacultiesStart,
  getFacultiesFailure,
  getFacultiesSuccess,
  getFacultyDepartmentsStart,
  getFacultyDepartmentsFailure,
  getFacultyDepartmentsSuccess,
  resetError,
} = facultiesSlice.actions

export const getAllFaculties = (router) =>
  async dispatch => {
    try {
      dispatch(getFacultiesStart())

      const faculties = await apiGetAllFaculties()

      dispatch(getFacultiesSuccess(faculties))

    } catch (error) {
      dispatch(getFacultiesFailure(error));
      handleServerErrors(error, router, dispatch);
    }
  }

export const getFacultyDepartments = (id, router) =>
  async dispatch => {
    try {
      dispatch(getFacultyDepartmentsStart())

      const departments = await apiGetFacultyDepartments(id);

      dispatch(getFacultyDepartmentsSuccess(departments))

    } catch (error) {
      dispatch(getFacultyDepartmentsFailure(error));
      handleServerErrors(error, router, dispatch);
    }
  }

export default facultiesSlice.reducer;