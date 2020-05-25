import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllPositions } from '../api/positionsAPI';

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
    resetError(state) {
      state.error = null;
    },
    getPositionsSuccess(state, { payload }) {
      // TODO: валидация данных
      state.positions = payload;
      state.isLoading = false
      state.error = null
    }
  },
});

export const {
  getPositionsStart,
  getPositionsFailure,
  getPositionsSuccess,
  resetError,
} = positionsSlice.actions

export const getAllPositions = (router) =>
  async dispatch => {
    try {
      dispatch(getPositionsStart())

      const positions = await apiGetAllPositions()

      dispatch(getPositionsSuccess(positions))

    } catch (err) {

      dispatch(getPositionsFailure(err));
    }
  }

export default positionsSlice.reducer;