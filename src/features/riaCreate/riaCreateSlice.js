import { createSlice } from '@reduxjs/toolkit'
import { apiCreateRia } from '../../api/riaAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const riaCreateSlice = createSlice({
  name: 'riaCreate',
  initialState: { isLoading: false, error: null },
  reducers: {
    createRiaStart: startLoading,
    createRiaFailure: loadingFailed,

    resetError(state) {
      state.error = null
    },

    createRiaSuccess(state) {
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  createRiaStart,
  createRiaFailure,
  createRiaSuccess,
  resetError,
} = riaCreateSlice.actions

export const createRia = (ria, router) => async (dispatch) => {
  try {
    dispatch(createRiaStart())

    const newRia = await apiCreateRia(ria)

    dispatch(createRiaSuccess(newRia))
    dispatch(enqueueSnackbar('Запись успешно добавлена', 'success'))
    router.goBack()
  } catch (error) {
    dispatch(createRiaFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default riaCreateSlice.reducer
