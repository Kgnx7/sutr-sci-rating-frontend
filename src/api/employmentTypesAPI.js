import axios from 'axios'

export async function apiGetAllEmploymentTypes() {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/employmentTypes/list`

    const responce = await axios.get(url, {
      withCredentials: true,
      timeout: 3000,
    })

    return responce.data
  } catch (error) {
    throw error
  }
}
