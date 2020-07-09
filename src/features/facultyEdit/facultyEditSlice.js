import { createSlice } from '@reduxjs/toolkit'
import { apiEditFaculty } from '../../api/facultiesAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const facultyEditSlice = createSlice({
  name: 'facultyEdit',
  initialState: { editedFaculty: null, isLoading: false, error: null },
  reducers: {
    editFacultyStart: startLoading,
    editFacultyFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    editFacultySuccess(state, { payload }) {
      state.editedFaculty = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  editFacultyStart,
  editFacultyFailure,
  editFacultySuccess,
  resetError,
} = facultyEditSlice.actions

export const editFaculty = (updatedFaculty, router) => async (dispatch) => {
  try {
    dispatch(editFacultyStart())

    const editedFaculty = await apiEditFaculty(updatedFaculty.id, updatedFaculty)

    dispatch(editFacultySuccess(editedFaculty))
    dispatch(enqueueSnackbar('Факультет успешно обновлен', 'success'))
    router.push('/faculties')
  } catch (error) {
    dispatch(editFacultyFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default facultyEditSlice.reducer
