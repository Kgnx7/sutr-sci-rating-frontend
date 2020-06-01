import axios from 'axios'

export async function apiGetAllDepartments() {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/departments/list`

    const responce = await axios.get(url, { withCredentials: true, timeout: 3000 })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiGetDepartment(facultyId, departmentId) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/faculties/${facultyId}/departments/${departmentId}`

    const responce = await axios.get(url, { withCredentials: true, timeout: 3000 })

    return responce.data
  } catch (error) {
    throw error
  }
}
