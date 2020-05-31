import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllAcademicDegrees } from '../api/academicDegreesAPI';
import { handleServerErrors } from '../utils/errorHandler';

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

    } catch (error) {
      dispatch(getAcademicDegreesFailure(error));
      handleServerErrors(error, router, dispatch);
    }
  }

export default academicDegreesSlice.reducer;