import axios from 'axios'

export async function apiGetRsTypes() {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/rsTypes/list`

    const responce = await axios.get(url, {
      withCredentials: true,
      timeout: 3000,
    })

    return responce.data
  } catch (error) {
    throw error
  }
}
