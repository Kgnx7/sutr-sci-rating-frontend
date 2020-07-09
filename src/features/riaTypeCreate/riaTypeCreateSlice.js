import { createSlice } from '@reduxjs/toolkit'
import { apiCreateRiaType } from '../../api/riaTypesAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const riaTypeCreateSlice = createSlice({
  name: 'riaTypeCreate',
  initialState: { isLoading: false, error: null },
  reducers: {
    createRiaTypeStart: startLoading,
    createRiaTypeFailure: loadingFailed,

    resetError(state) {
      state.error = null
    },

    createRiaTypeSuccess(state) {
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  createRiaTypeStart,
  createRiaTypeFailure,
  createRiaTypeSuccess,
  resetError,
} = riaTypeCreateSlice.actions

export const createRiaType = (riaType, router) => async (dispatch) => {
  try {
    dispatch(createRiaTypeStart())

    const newRiaType = await apiCreateRiaType(riaType)

    dispatch(createRiaTypeSuccess(newRiaType))
    dispatch(enqueueSnackbar('Запись успешно добавлена', 'success'))
    router.goBack()
  } catch (error) {
    dispatch(createRiaTypeFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default riaTypeCreateSlice.reducer
