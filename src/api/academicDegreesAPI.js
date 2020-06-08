import axios from 'axios'

export async function apiGetAllAcademicDegrees() {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/academicDegrees/list`

    const responce = await axios.get(url, { withCredentials: true, timeout: 3000 })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiCreateAcademicDegree(newAcademicDegree) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/academicDegrees/create`

    const responce = await axios.post(url, newAcademicDegree, {
      withCredentials: true,
      timeout: 3000,
    })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiDeleteAcademicDegree(academicDegreeId) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/academicDegrees/delete/${academicDegreeId}`

    const responce = await axios.get(url, {
      withCredentials: true,
      timeout: 3000,
    })

    return responce.data
  } catch (error) {
    throw error
  }
}
