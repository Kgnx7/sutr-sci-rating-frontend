import { createSlice } from '@reduxjs/toolkit'
import { apiGetUsersByDepartment } from '../../api/usersAPI'
import { apiGetDepartment, apiDeleteDepartment } from '../../api/departmentsAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

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
    deleteDepartmentStart: startLoading,
    deleteDepartmentFailure: loadingFailed,
    getDepartmentUsersStart: startLoading,
    getDepartmentUsersFailure: loadingFailed,

    resetError(state) {
      state.error = null
    },
    getDepartmentSuccess(state, { payload }) {
      state.department = payload
      state.isLoading = false
      state.error = null
    },
    deleteDepartmentSuccess(state) {
      state.department = null
      state.isLoading = false
      state.error = null
    },
    getDepartmentUsersSuccess(state, { payload }) {
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
  deleteDepartmentStart,
  deleteDepartmentFailure,
  deleteDepartmentSuccess,
  getDepartmentUsersStart,
  getDepartmentUsersFailure,
  getDepartmentUsersSuccess,
  resetError,
} = departmentSlice.actions

export const getDepartment = (departmentId, router) => async (dispatch) => {
  try {
    dispatch(getDepartmentStart())

    const department = await apiGetDepartment(departmentId)

    department.manager = [
      department.manager.name,
      department.manager.surname,
      department.manager.patronymic,
    ]
      .join(' ')
      .trim()
    department.faculty = department.faculty.short

    dispatch(getDepartmentSuccess(department))
  } catch (error) {
    dispatch(getDepartmentFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export const deleteDepartment = (departmentId, router) => async (dispatch) => {
  try {
    dispatch(deleteDepartmentStart())

    await apiDeleteDepartment(departmentId)

    dispatch(deleteDepartmentSuccess())
    router.goBack()
    dispatch(enqueueSnackbar('Кафедра успешно удалена', 'success'))
  } catch (error) {
    dispatch(deleteDepartmentFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export const getUsersByDepartment = (departmentId, filter, offset, limit, router) => async (
  dispatch
) => {
  try {
    dispatch(getDepartmentUsersStart())

    let { users, count } = await apiGetUsersByDepartment(departmentId, filter, offset, limit)

    users = users.map((user) => ({
      ...user,
      displayName: [user.user.name, user.user.surname, user.user.patronymic].join(' ').trim(),
      position: user.position.title,
    }))

    dispatch(getDepartmentUsersSuccess({ users, count }))
  } catch (error) {
    dispatch(getDepartmentUsersFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default departmentSlice.reducer
