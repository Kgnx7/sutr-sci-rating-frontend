import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllResearchWorks } from '../../api/researchWorksAPI'
import { handleServerErrors } from '../../utils/errorHandler'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const researchWorksSlice = createSlice({
  name: 'researchWorks',
  initialState: { researchWorks: [], count: 0, isLoading: false, error: null },
  reducers: {
    getResearchWorksStart: startLoading,
    getResearchWorksFailure: loadingFailed,

    resetError(state) {
      state.error = null
    },
    getResearchWorksSuccess(state, { payload }) {
      // TODO: валидация данных
      state.researchWorks = payload.researchWorks
      state.count = payload.count
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getResearchWorksStart,
  getResearchWorksFailure,
  getResearchWorksSuccess,
  resetError,
} = researchWorksSlice.actions

export const getAllResearchWorks = (search, offset, limit, router) => async (dispatch) => {
  try {
    dispatch(getResearchWorksStart())

    const { researchWorks, count } = await apiGetAllResearchWorks(search, offset, limit)

    dispatch(getResearchWorksSuccess({ researchWorks, count }))
  } catch (error) {
    dispatch(getResearchWorksFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default researchWorksSlice.reducer
