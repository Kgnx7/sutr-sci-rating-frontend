import { createSlice } from '@reduxjs/toolkit'
import { apiGetFaculty, apiGetFacultyDepartments } from '../../api/facultiesAPI'
import { apiDepartmentByFaculty } from '../../api/departmentsAPI'
import { handleServerErrors } from '../../utils/errorHandler'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const facultySlice = createSlice({
  name: 'faculty',
  initialState: { faculty: null, departments: [], isLoading: false, error: null },
  reducers: {
    getFacultyStart: startLoading,
    getFacultyFailure: loadingFailed,
    getFacultyDepartmentsStart: startLoading,
    getFacultyDepartmentsFailure: loadingFailed,

    resetError(state) {
      state.error = null
    },
    getFacultySuccess(state, { payload }) {
      // TODO: валидация данных
      state.faculty = payload
      state.isLoading = false
      state.error = null
    },
    getFacultyDepartmentsSuccess(state, { payload }) {
      // TODO: валидация данных
      state.departments = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getFacultyStart,
  getFacultyFailure,
  getFacultySuccess,
  getFacultyDepartmentsStart,
  getFacultyDepartmentsFailure,
  getFacultyDepartmentsSuccess,
  resetError,
} = facultySlice.actions

export const getFaculty = (facultyId, router) => async (dispatch) => {
  try {
    dispatch(getFacultyStart())

    const faculty = await apiGetFaculty(facultyId)

    dispatch(getFacultySuccess(faculty))
  } catch (error) {
    dispatch(getFacultyFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export const getFacultyDepartments = (facultyId, router) => async (dispatch) => {
  try {
    dispatch(getFacultyDepartmentsStart())

    const departments = await apiDepartmentByFaculty(facultyId)

    dispatch(getFacultyDepartmentsSuccess(departments))
  } catch (error) {
    dispatch(getFacultyDepartmentsFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default facultySlice.reducer
