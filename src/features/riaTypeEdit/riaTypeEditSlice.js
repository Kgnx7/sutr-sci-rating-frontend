import { createSlice } from '@reduxjs/toolkit'
import { apiEditRiaType } from '../../api/riaTypesAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const riaTypeEditSlice = createSlice({
  name: 'riaTypeEdit',
  initialState: { isLoading: false, error: null },
  reducers: {
    editRiaTypeStart: startLoading,
    editRiaTypeFailure: loadingFailed,

    resetError(state) {
      state.error = null
    },

    editRiaTypeSuccess(state) {
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  editRiaTypeStart,
  editRiaTypeFailure,
  editRiaTypeSuccess,
  resetError,
} = riaTypeEditSlice.actions

export const editRiaType = (riaType, router) => async (dispatch) => {
  try {
    dispatch(editRiaTypeStart())

    const updatedRiaType = await apiEditRiaType(riaType)

    dispatch(editRiaTypeSuccess(updatedRiaType))
    dispatch(enqueueSnackbar('Запись успешно обновлена', 'success'))
    router.goBack()
  } catch (error) {
    dispatch(editRiaTypeFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export const addProperty = (newProperty, router) => async (dispatch) => {
  try {
    dispatch(editRiaTypeStart())

    await apiEditRiaType(newProperty)

    dispatch(editRiaTypeSuccess())
    dispatch(enqueueSnackbar('Запись успешно обновлена', 'success'))
    router.goBack()
  } catch (error) {
    dispatch(editRiaTypeFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default riaTypeEditSlice.reducer
