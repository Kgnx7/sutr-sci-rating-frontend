import { createSlice } from '@reduxjs/toolkit'
import { apiGetRiaType, apiDeleteRiaType } from '../../api/riaTypesAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const riaTypeSlice = createSlice({
  name: 'riaType',
  initialState: { riaType: null, isLoading: false, error: null },
  reducers: {
    getRiaTypeStart: startLoading,
    getRiaTypeFailure: loadingFailed,
    deleteRiaTypeStart: startLoading,
    deleteRiaTypeFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getRiaTypeSuccess(state, { payload }) {
      state.riaType = payload
      state.isLoading = false
      state.error = null
    },
    deleteRiaTypeSuccess(state, { payload }) {
      state.riaType = null
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getRiaTypeStart,
  getRiaTypeFailure,
  getRiaTypeSuccess,
  deleteRiaTypeStart,
  deleteRiaTypeFailure,
  deleteRiaTypeSuccess,
  resetError,
} = riaTypeSlice.actions

export const getRiaType = (riaTypeId, router) => async (dispatch) => {
  try {
    dispatch(getRiaTypeStart())

    const riaType = await apiGetRiaType(riaTypeId)

    dispatch(getRiaTypeSuccess(riaType))
  } catch (error) {
    dispatch(getRiaTypeFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export const deleteRiaType = (riaTypeId, router) => async (dispatch) => {
  try {
    dispatch(deleteRiaTypeStart())

    await apiDeleteRiaType(riaTypeId)

    dispatch(deleteRiaTypeSuccess(riaTypeId))
    dispatch(enqueueSnackbar('Запись успешно удалена', 'success'))
    router.goBack()
  } catch (error) {
    dispatch(deleteRiaTypeFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default riaTypeSlice.reducer
