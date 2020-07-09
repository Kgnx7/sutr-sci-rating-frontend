import { createSlice } from '@reduxjs/toolkit'
import { apiGetRsTypes } from '../../api/rsTypesAPI'
import { handleServerErrors } from '../../utils/errorHandler'
// import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const rsTypesSlice = createSlice({
  name: 'rsTypes',
  initialState: { rsTypes: [], isLoading: false, error: null },
  reducers: {
    getRsTypesStart: startLoading,
    getRsTypesFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getRsTypesSuccess(state, { payload }) {
      state.rsTypes = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getRsTypesStart,
  getRsTypesFailure,
  getRsTypesSuccess,
  resetError,
} = rsTypesSlice.actions

export const getRsTypes = (router) => async (dispatch) => {
  try {
    dispatch(getRsTypesStart())

    const rsTypes = await apiGetRsTypes()

    dispatch(getRsTypesSuccess(rsTypes))
  } catch (error) {
    dispatch(getRsTypesFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default rsTypesSlice.reducer
