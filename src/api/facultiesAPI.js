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

export async function apiGetFacultyDepartments(facultyId) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/faculties/${facultyId}/departments`

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
