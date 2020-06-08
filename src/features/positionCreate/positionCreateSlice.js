import { createSlice } from '@reduxjs/toolkit'
import { apiCreatePosition } from '../../api/positionsAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const positionCreateSlice = createSlice({
  name: 'positionCreate',
  initialState: { createdPosition: null, isLoading: false, error: null },
  reducers: {
    createPositionStart: startLoading,
    createPositionFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    createPositionSuccess(state, { payload }) {
      // TODO: валидация данных
      state.createdPosition = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  createPositionStart,
  createPositionFailure,
  createPositionSuccess,
  resetError,
} = positionCreateSlice.actions

export const createPosition = (id, router) => async (dispatch) => {
  try {
    dispatch(createPositionStart())

    const createPosition = await apiCreatePosition(id)

    dispatch(createPositionSuccess(createPosition))
    dispatch(enqueueSnackbar('Должность успешно создана', 'success'))
    router.push('/positions')
  } catch (error) {
    dispatch(createPositionFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default positionCreateSlice.reducer
