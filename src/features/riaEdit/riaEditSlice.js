import { createSlice } from '@reduxjs/toolkit'
import { apiAddRiaProperty } from '../../api/riaAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const riaEditSlice = createSlice({
  name: 'riaPropertyCreate',
  initialState: { createdRiaProperty: [], isLoading: false, error: null },
  reducers: {
    createRiaPropertyStart: startLoading,
    createRiaPropertyFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    createRiaPropertySuccess(state, { payload }) {
      state.createdRiaProperty = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  createRiaPropertyStart,
  createRiaPropertyFailure,
  createRiaPropertySuccess,
  resetError,
} = riaEditSlice.actions

export const createRiaProperty = (newRiaProperty, router) => async (dispatch) => {
  try {
    dispatch(createRiaPropertyStart())

    const createdRiaProperty = await apiAddRiaProperty(newRiaProperty)

    dispatch(createRiaPropertySuccess(createdRiaProperty))
    dispatch(enqueueSnackbar('Запись успешно создана', 'success'))
    router.goBack()
  } catch (error) {
    dispatch(createRiaPropertyFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default riaEditSlice.reducer
