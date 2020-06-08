import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllPositions, apiDeletePosition } from '../../api/positionsAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const positionsSlice = createSlice({
  name: 'positions',
  initialState: { positions: [], isLoading: false, error: null },
  reducers: {
    getPositionsStart: startLoading,
    getPositionsFailure: loadingFailed,
    deletePositionStart: startLoading,
    deletePositionFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getPositionsSuccess(state, { payload }) {
      // TODO: валидация данных
      state.positions = payload
      state.isLoading = false
      state.error = null
    },
    deletePositionSuccess(state, { payload }) {
      state.positions = state.positions.filter((position) => position.id !== payload)
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getPositionsStart,
  getPositionsFailure,
  getPositionsSuccess,
  deletePositionStart,
  deletePositionFailure,
  deletePositionSuccess,
  resetError,
} = positionsSlice.actions

export const getAllPositions = (router) => async (dispatch) => {
  try {
    dispatch(getPositionsStart())

    const positions = await apiGetAllPositions()

    dispatch(getPositionsSuccess(positions))
  } catch (error) {
    dispatch(getPositionsFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export const deletePosition = (positionId, router) => async (dispatch) => {
  try {
    dispatch(deletePositionStart())

    const responce = await apiDeletePosition(positionId)

    dispatch(deletePositionSuccess(positionId))
    dispatch(enqueueSnackbar(responce.message || 'Должность успешно удалена', 'success'))
  } catch (error) {
    dispatch(deletePositionFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default positionsSlice.reducer
