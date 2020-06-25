import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllDepartments } from '../../api/departmentsAPI'
import { handleServerErrors } from '../../utils/errorHandler'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const departmentsSlice = createSlice({
  name: 'departments',
  initialState: { departments: [], isLoading: false, error: null },
  reducers: {
    getDepartmentsStart: startLoading,
    getDepartmentsFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getDepartmentsSuccess(state, { payload }) {
      // TODO: валидация данных
      state.departments = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getDepartmentsStart,
  getDepartmentsFailure,
  getDepartmentsSuccess,
  resetError,
} = departmentsSlice.actions

export const getAllDepartments = (facultyId, router) => async (dispatch) => {
  try {
    dispatch(getDepartmentsStart())

    let departments = await apiGetAllDepartments(facultyId)

    departments = departments.map((department) => ({
      ...department,
      manager: [department.manager.name, department.manager.surname, department.manager.patronymic]
        .join(' ')
        .trim(),
      faculty: department.faculty.short,
    }))

    dispatch(getDepartmentsSuccess(departments))
  } catch (error) {
    dispatch(getDepartmentsFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default departmentsSlice.reducer
