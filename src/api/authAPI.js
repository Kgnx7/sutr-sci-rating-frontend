import axios from 'axios'

export async function apiLogin(login, password) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/auth/login`
    const data = {
      login,
      password,
    }
    const options = {
      withCredentials: true,
    }

    const responce = await axios.post(url, data, options)

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiLogout() {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/auth/logout`

    await axios.get(url)
  } catch (error) {
    throw error
  }
}
