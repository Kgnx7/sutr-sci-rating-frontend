import { createSlice } from '@reduxjs/toolkit'
import { apiСreateUserStatus } from '../../api/usersAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const userStatusCreateSlice = createSlice({
  name: 'userStatusCreate',
  initialState: { isLoading: false, error: null },
  reducers: {
    createUserStatusStart: startLoading,
    createUserStatusFailure: loadingFailed,

    resetError(state) {
      state.error = null
    },

    createUserStatusSuccess(state) {
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  createUserStatusStart,
  createUserStatusFailure,
  createUserStatusSuccess,
  resetError,
} = userStatusCreateSlice.actions

export const createUserStatus = (userState, router) => async (dispatch) => {
  try {
    dispatch(createUserStatusStart())

    const newUserState = await apiСreateUserStatus(userState)

    dispatch(createUserStatusSuccess())
    dispatch(enqueueSnackbar('Должность успешно добавлена', 'success'))
    router.push(`/users/get/${newUserState.userId}`)
  } catch (error) {
    dispatch(createUserStatusFailure(error))
    handleServerErrors(error, router, dispatch)
  }
}

export default userStatusCreateSlice.reducer
