import axios from 'axios'

export async function apiGetRia(riaId) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/ria/get/${riaId}`

    const responce = await axios.get(url, {
      withCredentials: true,
      timeout: 3000,
    })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiCreateRia(newRia) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/ria/create`

    const responce = await axios.post(url, newRia, {
      withCredentials: true,
      timeout: 3000,
    })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiAddRiaProperty(property) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/ria/addProperty`

    const responce = await axios.post(url, property, {
      withCredentials: true,
      timeout: 3000,
    })

    return responce.data
  } catch (error) {
    throw error
  }
}
