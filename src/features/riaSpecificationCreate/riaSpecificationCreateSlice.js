import { createSlice } from '@reduxjs/toolkit'
import { apiCreateRiaSpecification } from '../../api/riaSpecificationsAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const riaSpecificationCreateSlice = createSlice({
  name: 'riaSpecificationCreate',
  initialState: { createdRiaSpecification: [], isLoading: false, error: null },
  reducers: {
    createRiaSpecificationStart: startLoading,
    createRiaSpecificationFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    createRiaSpecificationSuccess(state, { payload }) {
      state.createdRiaSpecification = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  createRiaSpecificationStart,
  createRiaSpecificationFailure,
  createRiaSpecificationSuccess,
  resetError,
} = riaSpecificationCreateSlice.actions

export const createRiaSpecification = (newRiaSpecification, router) => async (dispatch) => {
  try {
    dispatch(createRiaSpecificationStart())

    const createdRiaSpecification = await apiCreateRiaSpecification(newRiaSpecification)

    dispatch(createRiaSpecificationSuccess(createdRiaSpecification))
    dispatch(enqueueSnackbar('Запись успешно создана', 'success'))
    router.goBack()
  } catch (error) {
    dispatch(createRiaSpecificationFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default riaSpecificationCreateSlice.reducer
