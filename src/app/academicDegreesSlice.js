import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllAcademicDegrees } from '../api/academicDegreesAPI';

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const academicDegreesSlice = createSlice({
  name: 'academicDegrees',
  initialState: { academicDegrees: [], isLoading: false, error: null },
  reducers: {
    getAcademicDegreesStart: startLoading,
    getAcademicDegreesFailure: loadingFailed,
    resetError(state) {
      state.error = null;
    },
    getAcademicDegreesSuccess(state, { payload }) {
      // TODO: валидация данных
      state.academicDegrees = payload;
      state.isLoading = false
      state.error = null
    }
  },
});

export const {
  getAcademicDegreesStart,
  getAcademicDegreesFailure,
  getAcademicDegreesSuccess,
  resetError,
} = academicDegreesSlice.actions

export const getAllAcademicDegrees = (router) =>
  async dispatch => {
    try {
      dispatch(getAcademicDegreesStart())

      const academicDegrees = await apiGetAllAcademicDegrees()

      dispatch(getAcademicDegreesSuccess(academicDegrees))

    } catch (err) {

      dispatch(getAcademicDegreesFailure(err));
    }
  }

export default academicDegreesSlice.reducer;