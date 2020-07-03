import { createSlice } from '@reduxjs/toolkit'
import { apiGetSpecialties } from '../../api/specialtiesAPI'
import { handleServerErrors } from '../../utils/errorHandler'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const specialtiesSlice = createSlice({
  name: 'specialties',
  initialState: { specialties: [], isLoading: false, error: null },
  reducers: {
    getSpecialtiesStart: startLoading,
    getSpecialtiesFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getSpecialtiesSuccess(state, { payload }) {
      state.specialties = payload.specialties
      state.count = payload.count
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  getSpecialtiesStart,
  getSpecialtiesFailure,
  getSpecialtiesSuccess,
  resetError,
} = specialtiesSlice.actions

export const getSpecialties = (search, offset, limit, router) => async (dispatch) => {
  try {
    dispatch(getSpecialtiesStart())

    const { specialties, count } = await apiGetSpecialties(search, offset, limit)

    dispatch(getSpecialtiesSuccess({ specialties, count }))
  } catch (error) {
    dispatch(getSpecialtiesFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default specialtiesSlice.reducer
