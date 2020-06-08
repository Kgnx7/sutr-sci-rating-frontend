import { createSlice } from '@reduxjs/toolkit'
import { apiCreateFaculty } from '../../api/facultiesAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const facultyCreateSlice = createSlice({
  name: 'facultyCreate',
  initialState: { createdFaculty: null, isLoading: false, error: null },
  reducers: {
    createFacultyStart: startLoading,
    createFacultyFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    createFacultySuccess(state, { payload }) {
      // TODO: валидация данных
      state.createdFaculty = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  createFacultyStart,
  createFacultyFailure,
  createFacultySuccess,
  resetError,
} = facultyCreateSlice.actions

export const createFaculty = (newFaculty, router) => async (dispatch) => {
  try {
    dispatch(createFacultyStart())

    const createdFaculty = await apiCreateFaculty(newFaculty)

    dispatch(createFacultySuccess(createdFaculty))
    dispatch(enqueueSnackbar('Факультет успешно создан', 'success'))
    router.push('/faculties')
  } catch (error) {
    dispatch(createFacultyFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default facultyCreateSlice.reducer
