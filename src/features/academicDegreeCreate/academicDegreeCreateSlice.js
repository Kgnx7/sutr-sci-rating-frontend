import { createSlice } from '@reduxjs/toolkit'
import { apiCreateAcademicDegree } from '../../api/academicDegreesAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const academicDegreeCreateSlice = createSlice({
  name: 'academicDegreeCreate',
  initialState: { createdAcademicDegree: null, isLoading: false, error: null },
  reducers: {
    createAcademicDegreeStart: startLoading,
    createAcademicDegreeFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    createAcademicDegreeSuccess(state, { payload }) {
      // TODO: валидация данных
      state.createdAcademicDegree = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  createAcademicDegreeStart,
  createAcademicDegreeFailure,
  createAcademicDegreeSuccess,
  resetError,
} = academicDegreeCreateSlice.actions

export const createAcademicDegree = (id, router) => async (dispatch) => {
  try {
    dispatch(createAcademicDegreeStart())

    const createAcademicDegree = await apiCreateAcademicDegree(id)

    dispatch(createAcademicDegreeSuccess(createAcademicDegree))
    dispatch(enqueueSnackbar('Запись успешно создана', 'success'))
    router.push('/academicDegrees')
  } catch (error) {
    dispatch(createAcademicDegreeFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default academicDegreeCreateSlice.reducer
