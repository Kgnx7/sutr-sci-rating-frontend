import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllAcademicRanks, apiDeleteAcademicRank } from '../../api/academicRanksAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const academicRanksSlice = createSlice({
  name: 'academicRanks',
  initialState: { academicRanks: [], isLoading: false, error: null },
  reducers: {
    getAcademicRanksStart: startLoading,
    getAcademicRanksFailure: loadingFailed,
    deleteAcademicRankStart: startLoading,
    deleteAcademicRankFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getAcademicRanksSuccess(state, { payload }) {
      // TODO: валидация данных
      state.academicRanks = payload
      state.isLoading = false
      state.error = null
    },
    deleteAcademicRankSuccess(state, { payload }) {
      state.academicRanks = state.academicRanks.filter((ad) => ad.id !== payload)
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getAcademicRanksStart,
  getAcademicRanksFailure,
  getAcademicRanksSuccess,
  deleteAcademicRankStart,
  deleteAcademicRankFailure,
  deleteAcademicRankSuccess,
  resetError,
} = academicRanksSlice.actions

export const getAllAcademicRanks = (router) => async (dispatch) => {
  try {
    dispatch(getAcademicRanksStart())

    const academicRanks = await apiGetAllAcademicRanks()

    dispatch(getAcademicRanksSuccess(academicRanks))
  } catch (error) {
    dispatch(getAcademicRanksFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export const deleteAcademicRank = (AcademicRankId, router) => async (dispatch) => {
  try {
    dispatch(deleteAcademicRankStart())

    const responce = await apiDeleteAcademicRank(AcademicRankId)

    dispatch(deleteAcademicRankSuccess(AcademicRankId))
    dispatch(enqueueSnackbar('Запись успешно удалена', 'success'))
  } catch (error) {
    dispatch(deleteAcademicRankFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default academicRanksSlice.reducer
