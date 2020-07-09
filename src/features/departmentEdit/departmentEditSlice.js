import { createSlice } from '@reduxjs/toolkit'
import { apiEditDepartment } from '../../api/departmentsAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const departmentEditSlice = createSlice({
  name: 'departmentEdit',
  initialState: { department: null, isLoading: false, error: null },
  reducers: {
    editDepartmentStart: startLoading,
    editDepartmentFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    editDepartmentSuccess(state, { payload }) {
      state.department = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  editDepartmentStart,
  editDepartmentFailure,
  editDepartmentSuccess,
  resetError,
} = departmentEditSlice.actions

export const editDepartment = (updatedDepartment, router) => async (dispatch) => {
  try {
    dispatch(editDepartmentStart())

    const editedDepartment = await apiEditDepartment(updatedDepartment)

    dispatch(editDepartmentSuccess(editedDepartment))
    dispatch(enqueueSnackbar('Кафедра успешно обновлена', 'success'))
    router.goBack()
  } catch (error) {
    dispatch(editDepartmentFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default departmentEditSlice.reducer
