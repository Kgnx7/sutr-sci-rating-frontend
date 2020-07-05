import axios from 'axios'

export async function apiGetAllDepartments(filter, offset, limit) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/departments/list`

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

export async function apiGetDepartment(departmentId) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/departments/get/${departmentId}`

    const responce = await axios.get(url, { withCredentials: true, timeout: 3000 })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiGetDepartmentsByFaculty(facultyId) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/departments/listByFaculty/${facultyId}`

    const responce = await axios.get(url, { withCredentials: true, timeout: 3000 })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiCreateDepartment(newDepartment) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/departments/create`

    const responce = await axios.post(url, newDepartment, { withCredentials: true, timeout: 3000 })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiEditDepartment(updatedDepartment) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/departments/edit/${updatedDepartment.id}`

    const responce = await axios.post(url, updatedDepartment, {
      withCredentials: true,
      timeout: 3000,
    })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiDeleteDepartment(departmentId) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/departments/delete/${departmentId}`

    const responce = await axios.get(url, { withCredentials: true, timeout: 3000 })

    return responce.data
  } catch (error) {
    throw error
  }
}
