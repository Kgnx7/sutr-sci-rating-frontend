import axios from 'axios'

export async function apiGetAllFaculties() {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/faculties/list`

    const responce = await axios.get(url, { withCredentials: true, timeout: 3000 })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiGetFaculty(id) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/faculties/get/${id}`

    const responce = await axios.get(url, { withCredentials: true, timeout: 3000 })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiCreateFaculty(newFaculty) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/faculties/create`

    const responce = await axios.post(url, newFaculty, { withCredentials: true, timeout: 3000 })

    return responce.data
  } catch (error) {
    throw error
  }
}
