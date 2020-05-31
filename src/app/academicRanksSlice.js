import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllAcademicRanks } from '../api/academicRanksAPI';
import { handleServerErrors } from '../utils/errorHandler';

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const academicRanksSlice = createSlice({
  name: 'academicRanks',
  initialState: { academicRanks: [], isLoading: false, error: null },
  reducers: {
    getAcademicRanksStart: startLoading,
    getAcademicRanksFailure: loadingFailed,
    resetError(state) {
      state.error = null;
    },
    getAcademicRanksSuccess(state, { payload }) {
      // TODO: валидация данных
      state.academicRanks = payload;
      state.isLoading = false
      state.error = null
    }
  },
});

export const {
  getAcademicRanksStart,
  getAcademicRanksFailure,
  getAcademicRanksSuccess,
  resetError,
} = academicRanksSlice.actions

export const getAllAcademicRanks = (router) =>
  async dispatch => {
    try {
      dispatch(getAcademicRanksStart())

      const academicRanks = await apiGetAllAcademicRanks()

      dispatch(getAcademicRanksSuccess(academicRanks))

    } catch (error) {
      dispatch(getAcademicRanksFailure(error));
      handleServerErrors(error, router, dispatch);
    }
  }

export default academicRanksSlice.reducer;