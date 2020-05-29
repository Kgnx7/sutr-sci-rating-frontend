import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllFaculties, apiGetFacultyDepartments } from '../api/facultiesAPI';

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

    } catch (err) {

      dispatch(getFacultiesFailure(err));
    }
  }

export const getFacultyDepartments = (id, router) =>
  async dispatch => {
    try {
      dispatch(getFacultyDepartmentsStart())

      const departments = await apiGetFacultyDepartments(id);

      dispatch(getFacultyDepartmentsSuccess(departments))

    } catch (err) {

      dispatch(getFacultyDepartmentsFailure(err));
    }
  }

export default facultiesSlice.reducer;