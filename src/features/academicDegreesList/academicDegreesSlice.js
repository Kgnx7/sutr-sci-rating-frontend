import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllAcademicDegrees, apiDeleteAcademicDegree } from '../../api/academicDegreesAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const academicDegreesSlice = createSlice({
  name: 'academicDegrees',
  initialState: { academicDegrees: [], isLoading: false, error: null },
  reducers: {
    getAcademicDegreesStart: startLoading,
    getAcademicDegreesFailure: loadingFailed,
    deleteAcademicDegreeStart: startLoading,
    deleteAcademicDegreeFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getAcademicDegreesSuccess(state, { payload }) {
      // TODO: валидация данных
      state.academicDegrees = payload
      state.isLoading = false
      state.error = null
    },
    deleteAcademicDegreeSuccess(state, { payload }) {
      state.academicDegrees = state.academicDegrees.filter((ad) => ad.id !== payload)
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getAcademicDegreesStart,
  getAcademicDegreesFailure,
  getAcademicDegreesSuccess,
  deleteAcademicDegreeStart,
  deleteAcademicDegreeFailure,
  deleteAcademicDegreeSuccess,
  resetError,
} = academicDegreesSlice.actions

export const getAllAcademicDegrees = (router) => async (dispatch) => {
  try {
    dispatch(getAcademicDegreesStart())

    const academicDegrees = await apiGetAllAcademicDegrees()

    dispatch(getAcademicDegreesSuccess(academicDegrees))
  } catch (error) {
    dispatch(getAcademicDegreesFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export const deleteAcademicDegree = (academicDegreeId, router) => async (dispatch) => {
  try {
    dispatch(deleteAcademicDegreeStart())

    const responce = await apiDeleteAcademicDegree(academicDegreeId)

    dispatch(deleteAcademicDegreeSuccess(academicDegreeId))
    dispatch(enqueueSnackbar('Запись успешно удалена', 'success'))
  } catch (error) {
    dispatch(deleteAcademicDegreeFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default academicDegreesSlice.reducer
