import { createSlice } from '@reduxjs/toolkit'
import { apiGetResearchWork } from '../../api/researchWorksAPI'
import { handleServerErrors } from '../../utils/errorHandler'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const researchWorkSlice = createSlice({
  name: 'researchWork',
  initialState: { researchWork: [], isLoading: false, error: null },
  reducers: {
    getResearchWorkStart: startLoading,
    getResearchWorkFailure: loadingFailed,

    resetError(state) {
      state.error = null
    },
    getResearchWorkSuccess(state, { payload }) {
      // TODO: валидация данных
      state.researchWork = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getResearchWorkStart,
  getResearchWorkFailure,
  getResearchWorkSuccess,
  resetError,
} = researchWorkSlice.actions

export const getResearchWork = (researchWorkId, router) => async (dispatch) => {
  try {
    dispatch(getResearchWorkStart())

    const responce = await apiGetResearchWork(researchWorkId)

    dispatch(getResearchWorkSuccess(responce))
  } catch (error) {
    dispatch(getResearchWorkFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default researchWorkSlice.reducer
