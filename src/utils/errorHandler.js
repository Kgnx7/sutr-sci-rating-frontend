import { signOut } from '../features/login/authSlice'
import { enqueueSnackbar } from '../app/appSlice'

export const handleServerErrors = (error, router, dispatch) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        dispatch(signOut())
        router.push('/login')
        break
      case 403:
        dispatch(enqueueSnackbar('Нет доступа', 'error'))
        break
      case 400:
        dispatch(enqueueSnackbar('Некорректные данные', 'error'))
        break
      case 404:
        dispatch(enqueueSnackbar('Ничего не найдено', 'error'))
        break
      default:
        break
    }
  } else if (error.request) {
    dispatch(enqueueSnackbar('Нет ответа от сервера', 'error'))
  } else {
    console.log('Error', error.message)
    dispatch(enqueueSnackbar('Что-то пошло не так', 'error'))
  }

  console.log(error.config)
}
