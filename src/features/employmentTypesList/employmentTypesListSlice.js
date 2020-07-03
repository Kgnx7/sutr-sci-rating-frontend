import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllEmploymentTypes } from '../../api/employmentTypesAPI'
import { handleServerErrors } from '../../utils/errorHandler'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const employmentTypesListSlice = createSlice({
  name: 'employmentTypes',
  initialState: { employmentTypes: [], isLoading: false, error: null },
  reducers: {
    getEmploymentTypesStart: startLoading,
    getEmploymentTypesFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getEmploymentTypesSuccess(state, { payload }) {
      state.employmentTypes = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getEmploymentTypesStart,
  getEmploymentTypesFailure,
  getEmploymentTypesSuccess,
  resetError,
} = employmentTypesListSlice.actions

export const getAllEmploymentTypes = (router) => async (dispatch) => {
  try {
    dispatch(getEmploymentTypesStart())

    let employmentTypes = await apiGetAllEmploymentTypes()

    dispatch(getEmploymentTypesSuccess(employmentTypes))
  } catch (error) {
    dispatch(getEmploymentTypesFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default employmentTypesListSlice.reducer
