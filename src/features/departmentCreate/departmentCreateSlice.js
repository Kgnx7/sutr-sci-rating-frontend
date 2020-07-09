import { createSlice } from '@reduxjs/toolkit'
import { apiCreateDepartment } from '../../api/departmentsAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const departmentCreateSlice = createSlice({
  name: 'departmentCreate',
  initialState: { createdDepartment: null, isLoading: false, error: null },
  reducers: {
    createDepartmentStart: startLoading,
    createDepartmentFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    createDepartmentSuccess(state, { payload }) {
      state.createdDepartment = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  createDepartmentStart,
  createDepartmentFailure,
  createDepartmentSuccess,
  resetError,
} = departmentCreateSlice.actions

export const createDepartment = (newDepartment, router) => async (dispatch) => {
  try {
    dispatch(createDepartmentStart())

    const createdDepartment = await apiCreateDepartment(newDepartment)

    dispatch(createDepartmentSuccess(createdDepartment))
    dispatch(enqueueSnackbar('Запись успешно создана', 'success'))
    router.goBack()
  } catch (error) {
    dispatch(createDepartmentFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default departmentCreateSlice.reducer
