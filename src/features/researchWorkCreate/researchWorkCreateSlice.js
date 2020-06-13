import { createSlice } from '@reduxjs/toolkit'
import { apiCreateResearchWork } from '../../api/researchWorksAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const researchWorkCreateSlice = createSlice({
  name: 'researchWorkCreate',
  initialState: { createdResearchWork: null, isLoading: false, error: null },
  reducers: {
    createResearchWorkStart: startLoading,
    createResearchWorkFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    createResearchWorkSuccess(state, { payload }) {
      // TODO: валидация данных
      state.createdResearchWork = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  createResearchWorkStart,
  createResearchWorkFailure,
  createResearchWorkSuccess,
  resetError,
} = researchWorkCreateSlice.actions

export const createResearchWork = (id, router) => async (dispatch) => {
  try {
    dispatch(createResearchWorkStart())

    const createResearchWork = await apiCreateResearchWork(id)

    dispatch(createResearchWorkSuccess(createResearchWork))
    dispatch(enqueueSnackbar('Должность успешно создана', 'success'))
    router.push('/researchWorks')
  } catch (error) {
    dispatch(createResearchWorkFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default researchWorkCreateSlice.reducer
