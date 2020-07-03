import { createSlice } from '@reduxjs/toolkit'
import { apiGetAllDegreeTypes } from '../../api/degreeTypesAPI'
import { handleServerErrors } from '../../utils/errorHandler'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const degreeTypesListSlice = createSlice({
  name: 'degreeTypesList',
  initialState: { degreeTypes: [], isLoading: false, error: null },
  reducers: {
    getDegreeTypesStart: startLoading,
    getDegreeTypesFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getDegreeTypesSuccess(state, { payload }) {
      state.degreeTypes = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getDegreeTypesStart,
  getDegreeTypesFailure,
  getDegreeTypesSuccess,
  resetError,
} = degreeTypesListSlice.actions

export const getAllDegreeTypes = (router) => async (dispatch) => {
  try {
    dispatch(getDegreeTypesStart())

    const degreeTypesList = await apiGetAllDegreeTypes()

    dispatch(getDegreeTypesSuccess(degreeTypesList))
  } catch (error) {
    dispatch(getDegreeTypesFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default degreeTypesListSlice.reducer
