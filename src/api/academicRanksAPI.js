import axios from 'axios'

export async function apiGetAllAcademicRanks() {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/academicRanks/list`

    const responce = await axios.get(url, { withCredentials: true, timeout: 3000 })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiCreateAcademicRank(newAcademicRank) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/academicRanks/create`

    const responce = await axios.post(url, newAcademicRank, {
      withCredentials: true,
      timeout: 3000,
    })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiDeleteAcademicRank(academicRankId) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/academicRanks/delete/${academicRankId}`

    const responce = await axios.get(url, { withCredentials: true, timeout: 3000 })

    return responce.data
  } catch (error) {
    throw error
  }
}
