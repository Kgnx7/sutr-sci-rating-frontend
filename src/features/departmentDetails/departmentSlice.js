import { createSlice } from '@reduxjs/toolkit'
import { apiGetUsersByDepartment } from '../../api/usersAPI'
import { apiGetDepartment } from '../../api/departmentsAPI'
import { handleServerErrors } from '../../utils/errorHandler'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const departmentSlice = createSlice({
  name: 'department',
  initialState: { department: [], users: [], usersCount: 0, isLoading: false, error: null },
  reducers: {
    getDepartmentStart: startLoading,
    getDepartmentFailure: loadingFailed,
    getDepartmentUsersStart: startLoading,
    getDepartmentUsersFailure: loadingFailed,

    resetError(state) {
      state.error = null
    },
    getDepartmentSuccess(state, { payload }) {
      // TODO: валидация данных
      state.department = payload
      state.isLoading = false
      state.error = null
    },
    getDepartmentUsersSuccess(state, { payload }) {
      // TODO: валидация данных
      state.users = payload.users
      state.usersCount = payload.count
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getDepartmentStart,
  getDepartmentFailure,
  getDepartmentSuccess,
  getDepartmentUsersStart,
  getDepartmentUsersFailure,
  getDepartmentUsersSuccess,
  resetError,
} = departmentSlice.actions

export const getDepartment = (facultyId, departmentId, router) => async (dispatch) => {
  try {
    dispatch(getDepartmentStart())

    const department = await apiGetDepartment(facultyId, departmentId)

    dispatch(getDepartmentSuccess(department))
  } catch (error) {
    dispatch(getDepartmentFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export const getDepartmentUsers = (
  facultyId,
  departmentId,
  filter,
  offset,
  limit,
  router
) => async (dispatch) => {
  try {
    dispatch(getDepartmentUsersStart())

    const { users, count } = await apiGetUsersByDepartment(
      facultyId,
      departmentId,
      filter,
      offset,
      limit
    )

    dispatch(getDepartmentUsersSuccess({ users, count }))
  } catch (error) {
    dispatch(getDepartmentUsersFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default departmentSlice.reducer
