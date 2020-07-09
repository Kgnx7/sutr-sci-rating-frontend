import { createSlice } from '@reduxjs/toolkit'
import { apiGetRia } from '../../api/riaAPI'
import { handleServerErrors } from '../../utils/errorHandler'
// import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const riaSlice = createSlice({
  name: 'ria',
  initialState: { ria: null, isLoading: false, error: null },
  reducers: {
    getRiaStart: startLoading,
    getRiaFailure: loadingFailed,
    deleteRiaStart: startLoading,
    deleteRiaFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    getRiaSuccess(state, { payload }) {
      state.ria = payload
      state.isLoading = false
      state.error = null
    },
    deleteRiaSuccess(state, { payload }) {
      state.ria = null
      state.isLoading = false
      state.error = null
    },
  },
})

export const { getRiaStart, getRiaFailure, getRiaSuccess, resetError } = riaSlice.actions

export const getRia = (riaId, router) => async (dispatch) => {
  try {
    dispatch(getRiaStart())

    const ria = await apiGetRia(riaId)

    dispatch(getRiaSuccess(ria))
  } catch (error) {
    dispatch(getRiaFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

// export const addProperty = (newProperty, router) => async (dispatch) => {
//   try {
//     dispatch(addRiaPropertyStart())

//     const riaProperty = await apiAddRiaProperty(newProperty)

//     dispatch(addRiaPropertySuccess(riaProperty))
//   } catch (error) {
//     dispatch(addRiaPropertyFailure(error))

//     handleServerErrors(error, router, dispatch)
//   }
// }

// export const deleteRia = (riaId, router) => async (dispatch) => {
//   try {
//     dispatch(deleteRiaStart())

//     await apiDeleteRia(riaId)

//     dispatch(deleteRiaSuccess(riaId))
//     dispatch(enqueueSnackbar('Запись успешно удалена', 'success'))
//     router.goBack()
//   } catch (error) {
//     dispatch(deleteRiaFailure(error))

//     handleServerErrors(error, router, dispatch)
//   }
// }

export default riaSlice.reducer
