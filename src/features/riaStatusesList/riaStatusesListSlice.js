import { createSlice } from '@reduxjs/toolkit'
import { apiGetRiaStatuses } from '../../api/riaStatusesAPI'
import { handleServerErrors } from '../../utils/errorHandler'
// import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const riaStatusesSlice = createSlice({
  name: 'riaStatuses',
  initialState: { riaStatuses: [], isLoading: false, error: null },
  reducers: {
    getRiaStatusesStart: startLoading,
    getRiaStatusesFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getRiaStatusesSuccess(state, { payload }) {
      state.riaStatuses = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getRiaStatusesStart,
  getRiaStatusesFailure,
  getRiaStatusesSuccess,
  resetError,
} = riaStatusesSlice.actions

export const getRiaStatuses = (router) => async (dispatch) => {
  try {
    dispatch(getRiaStatusesStart())

    const riaStatuses = await apiGetRiaStatuses()

    dispatch(getRiaStatusesSuccess(riaStatuses))
  } catch (error) {
    dispatch(getRiaStatusesFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default riaStatusesSlice.reducer
