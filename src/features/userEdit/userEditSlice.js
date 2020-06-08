import { createSlice } from '@reduxjs/toolkit'
import { apiEditUser } from '../../api/usersAPI'
import { handleServerErrors } from '../../utils/errorHandler'

function startLoading(state) {
  state.isLoading = true
}

function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}

const userEditSlice = createSlice({
  name: 'userEdit',
  initialState: { editedUser: null, isLoading: false, error: null },
  reducers: {
    editUserStart: startLoading,
    editUserFailure: loadingFailed,
    resetError(state) {
      state.error = null
    },
    editUserSuccess(state, { payload }) {
      // TODO: валидация данных
      state.editedUser = payload
      state.isLoading = false
      state.error = null
    },
  },
})

export const { editUserStart, editUserFailure, editUserSuccess, resetError } = userEditSlice.actions

export const editUser = (id, updatedUser, router) => async (dispatch) => {
  try {
    dispatch(editUserStart())

    const editedUser = await apiEditUser(id, updatedUser)

    dispatch(editUserSuccess(editedUser))
    router.push(`/users/${id}`)
  } catch (error) {
    dispatch(editUserFailure(error))

    handleServerErrors(error, router, dispatch)
  }
}

export default userEditSlice.reducer
