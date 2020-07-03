import { createSlice } from '@reduxjs/toolkit'
import { apiCreateUser } from '../../api/usersAPI'
import { handleServerErrors } from '../../utils/errorHandler'
import { enqueueSnackbar } from '../../app/appSlice'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const userCreateSlice = createSlice({
  name: 'userCreate',
  initialState: { createdUser: null, isLoading: false, error: null },
  reducers: {
    createUserStart: startLoading,
    createUserFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    createUserSuccess(state, { payload }) {
      // TODO: валидация данных
      state.createdUser = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  createUserStart,
  createUserFailure,
  createUserSuccess,
  resetError,
} = userCreateSlice.actions

export const createUser = (newUser, router) => async (dispatch) => {
  try {
    dispatch(createUserStart())

    const createdUser = await apiCreateUser(newUser)

    dispatch(createUserSuccess(createdUser))
    router.push(`/users/get/${createdUser.id}`)
    dispatch(enqueueSnackbar('Пользователь успешно создан', 'success'))
  } catch (error) {
    dispatch(createUserFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default userCreateSlice.reducer
