import axios from 'axios'

export async function apiGetAllUsers(filter, offset, limit) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/users/list`

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

export async function apiGetUser(userId) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/users/get/${userId}`
    const responce = await axios.get(url, {
      withCredentials: true,
      timeout: 3000,
    })
    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiGetUsersByDepartment(facultyId, departmentId, filter, offset, limit) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/faculties/${facultyId}/departments/${departmentId}/users`

    const responce = await axios.get(url, {
      params: { filter, offset, limit },
      withCredentials: true,
      timeout: 30000,
    })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiCreateUser(user) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/users/create`
    const options = { withCredentials: true }

    const responce = await axios.post(url, user, options)

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiDeleteUser(id) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/users/delete`
    const options = { withCredentials: true, params: { id } }

    const responce = await axios.get(url, options)

    return responce.data
  } catch (error) {
    throw error
  }
}
