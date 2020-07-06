import { createSlice } from '@reduxjs/toolkit'
import { apiGetRiaGeneralTypes } from '../../api/riaGeneralTypesAPI'
import { handleServerErrors } from '../../utils/errorHandler'
// import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const riaGeneralTypesSlice = createSlice({
  name: 'riaGeneralTypes',
  initialState: { riaGeneralTypes: [], isLoading: false, error: null },
  reducers: {
    getRiaGeneralTypesStart: startLoading,
    getRiaGeneralTypesFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getRiaGeneralTypesSuccess(state, { payload }) {
      state.riaGeneralTypes = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getRiaGeneralTypesStart,
  getRiaGeneralTypesFailure,
  getRiaGeneralTypesSuccess,
  resetError,
} = riaGeneralTypesSlice.actions

export const getRiaGeneralTypes = (router) => async (dispatch) => {
  try {
    dispatch(getRiaGeneralTypesStart())

    const riaGeneralTypes = await apiGetRiaGeneralTypes()

    dispatch(getRiaGeneralTypesSuccess(riaGeneralTypes))
  } catch (error) {
    dispatch(getRiaGeneralTypesFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default riaGeneralTypesSlice.reducer
