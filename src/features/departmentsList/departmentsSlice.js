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

export const getAllDepartments = (router) => async (dispatch) => {
  try {
    dispatch(getDepartmentsStart())

    const departments = await apiGetAllDepartments()

    dispatch(getDepartmentsSuccess(departments))
  } catch (error) {
    dispatch(getDepartmentsFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default departmentsSlice.reducer
