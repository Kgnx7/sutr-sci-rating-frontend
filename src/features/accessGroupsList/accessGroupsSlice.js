import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllAccessGroups } from '../../api/accessGroupsAPI'
import { handleServerErrors } from '../../utils/errorHandler'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const accessGroupsSlice = createSlice({
  name: 'accessGroups',
  initialState: { accessGroups: [], isLoading: false, error: null },
  reducers: {
    getAccessGroupsStart: startLoading,
    getAccessGroupsFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getAccessGroupsSuccess(state, { payload }) {
      state.accessGroups = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getAccessGroupsStart,
  getAccessGroupsFailure,
  getAccessGroupsSuccess,
  resetError,
} = accessGroupsSlice.actions

export const getAllAccessGroups = (router) => async (dispatch) => {
  try {
    dispatch(getAccessGroupsStart())

    const accessGroups = await apiGetAllAccessGroups()

    dispatch(getAccessGroupsSuccess(accessGroups))
  } catch (error) {
    dispatch(getAccessGroupsFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default accessGroupsSlice.reducer
