import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: { notifications: [] },
  reducers: {
    enqueue_snackbar(state, { payload }) {
      state.notifications = [
        ...state.notifications,
        {
          key: payload.key,
          ...payload.notification,
        },
      ]
    },
    close_snackbar(state, { payload }) {
      state.notifications = state.notifications.map(notification =>
        (payload.dismissAll || notification.key === payload.key)
          ? { ...notification, dismissed: true }
          : { ...notification })
    },
    remove_snackbar(state, { payload }) {
      state.notifications = state.notifications.filter(notification => notification.key !== payload)
    }
  },
});

export const {
  enqueue_snackbar,
  close_snackbar,
  remove_snackbar
} = appSlice.actions;

export const enqueueSnackbar = (message, variant, key = new Date().getTime() + Math.random()) =>
  async dispatch => {

    const notification = {
      message,
      options: {
        key: new Date().getTime() + Math.random(),
        variant,
      }
    }

    dispatch(enqueue_snackbar({
      notification,
      key: key || new Date().getTime() + Math.random()
    }));

  }

export const closeSnackbar = key =>
  async dispatch => {
    dispatch(close_snackbar({ dismissAll: !key, key }));
  }

export const removeSnackbar = key =>
  async dispatch => {
    dispatch(remove_snackbar(key));
  }



export default appSlice.reducer;