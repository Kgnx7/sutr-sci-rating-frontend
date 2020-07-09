import { createSlice } from '@reduxjs/toolkit'
import { apiGetRiaTypes } from '../../api/riaTypesAPI'
import { handleServerErrors } from '../../utils/errorHandler'
// import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const riaTypesSlice = createSlice({
  name: 'riaTypes',
  initialState: { riaTypes: [], count: 0, isLoading: false, error: null },
  reducers: {
    getRiaTypesStart: startLoading,
    getRiaTypesFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getRiaTypesSuccess(state, { payload }) {
      state.riaTypes = payload.riaTypes
      state.count = payload.count
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getRiaTypesStart,
  getRiaTypesFailure,
  getRiaTypesSuccess,
  resetError,
} = riaTypesSlice.actions

export const getRiaTypes = (search, offset, limit, router) => async (dispatch) => {
  try {
    dispatch(getRiaTypesStart())

    const { riaTypes, count } = await apiGetRiaTypes(search, offset, limit)

    dispatch(getRiaTypesSuccess({ riaTypes, count }))
  } catch (error) {
    dispatch(getRiaTypesFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default riaTypesSlice.reducer
