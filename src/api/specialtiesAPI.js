import axios from 'axios'

export async function apiGetSpecialties(filter, offset, limit) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/specialties/list`

    const responce = await axios.get(url, {
      params: { filter, offset, limit },
      withCredentials: true,
      timeout: 3000,
    })

    return responce.data
  } catch (error) {
    throw error
  }
}
