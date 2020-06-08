import { createSlice } from '@reduxjs/toolkit'
import { apiCreateAcademicRank } from '../../api/academicRanksAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const academicRankCreateSlice = createSlice({
  name: 'academicRankCreate',
  initialState: { createdAcademicRank: null, isLoading: false, error: null },
  reducers: {
    createAcademicRankStart: startLoading,
    createAcademicRankFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    createAcademicRankSuccess(state, { payload }) {
      // TODO: валидация данных
      state.createdAcademicRank = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  createAcademicRankStart,
  createAcademicRankFailure,
  createAcademicRankSuccess,
  resetError,
} = academicRankCreateSlice.actions

export const createAcademicRank = (id, router) => async (dispatch) => {
  try {
    dispatch(createAcademicRankStart())

    const createAcademicRank = await apiCreateAcademicRank(id)

    dispatch(createAcademicRankSuccess(createAcademicRank))
    dispatch(enqueueSnackbar('Запись успешно создана', 'success'))
    router.push('/academicRanks')
  } catch (error) {
    dispatch(createAcademicRankFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default academicRankCreateSlice.reducer
