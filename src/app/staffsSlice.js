import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllStaffs } from '../api/staffsAPI';

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const staffsSlice = createSlice({
  name: 'staffs',
  initialState: { staffs: [], isLoading: false, error: null },
  reducers: {
    getStaffsStart: startLoading,
    getStaffsFailure: loadingFailed,
    resetError(state) {
      state.error = null;
    },
    getStaffsSuccess(state, { payload }) {
      // TODO: валидация данных
      state.staffs = payload;
      state.isLoading = false
      state.error = null
    }
  },
});

export const {
  getStaffsStart,
  getStaffsFailure,
  getStaffsSuccess,
  resetError,
} = staffsSlice.actions

export const getAllStaffs = (router) =>
  async dispatch => {
    try {
      dispatch(getStaffsStart())

      const staffs = await apiGetAllStaffs()

      dispatch(getStaffsSuccess(staffs))

    } catch (err) {

      dispatch(getStaffsFailure(err));
    }
  }

export default staffsSlice.reducer;