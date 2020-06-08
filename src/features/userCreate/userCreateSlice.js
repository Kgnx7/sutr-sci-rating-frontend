import { createSlice } from '@reduxjs/toolkit'
import { apiCreateUser } from '../../api/usersAPI'
import { handleServerErrors } from '../../utils/errorHandler'

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

export const createUser = (id, router) => async (dispatch) => {
  try {
    dispatch(createUserStart())

    const createUser = await apiCreateUser(id)

    dispatch(createUserSuccess(createUser))
    router.push('/users')
  } catch (error) {
    dispatch(createUserFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default userCreateSlice.reducer
