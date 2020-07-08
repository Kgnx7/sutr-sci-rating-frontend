import { createSlice } from '@reduxjs/toolkit'
import { apiGetRiaSpecifications } from '../../api/riaSpecificationsAPI'
import { handleServerErrors } from '../../utils/errorHandler'
// import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const riaSpecificationsSlice = createSlice({
  name: 'riaSpecifications',
  initialState: { riaSpecifications: [], count: 0, isLoading: false, error: null },
  reducers: {
    getRiaSpecificationsStart: startLoading,
    getRiaSpecificationsFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getRiaSpecificationsSuccess(state, { payload }) {
      state.riaSpecifications = payload.riaSpecifications
      state.count = payload.count
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getRiaSpecificationsStart,
  getRiaSpecificationsFailure,
  getRiaSpecificationsSuccess,
  resetError,
} = riaSpecificationsSlice.actions

export const getRiaSpecifications = (search, offset, limit, router) => async (dispatch) => {
  try {
    dispatch(getRiaSpecificationsStart())

    const { riaSpecifications, count } = await apiGetRiaSpecifications(search, offset, limit)

    dispatch(getRiaSpecificationsSuccess({ riaSpecifications, count }))
  } catch (error) {
    dispatch(getRiaSpecificationsFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default riaSpecificationsSlice.reducer
