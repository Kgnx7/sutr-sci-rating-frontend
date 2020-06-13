import axios from 'axios'

export async function apiGetAllResearchWorks(filter, offset, limit) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/researchWorks/list`

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

export async function apiGetResearchWork(researchWorkId) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/researchWorks/get/${researchWorkId}`

    const responce = await axios.get(url, {
      withCredentials: true,
      timeout: 3000,
    })

    return responce.data
  } catch (error) {
    throw error
  }
}

// export async function apiGetResearchWork(researchWorkId) {
//   try {
//     const url = `${process.env.REACT_APP_HOST}/api/researchWorks/get/${researchWorkId}`
//     const responce = await axios.get(url, {
//       withCredentials: true,
//       timeout: 3000,
//     })
//     return responce.data
//   } catch (error) {
//     throw error
//   }
// }

// export async function apiGetResearchWorksByDepartment(departmentId, filter, offset, limit) {
//   try {
//     const url = `${process.env.REACT_APP_HOST}/api/researchWorks/listByDepartment/${departmentId}`

//     const responce = await axios.get(url, {
//       params: { filter, offset, limit },
//       withCredentials: true,
//       timeout: 30000,
//     })

//     return responce.data
//   } catch (error) {
//     throw error
//   }
// }

export async function apiCreateResearchWork(newResearchWork) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/researchWorks/create`
    const options = { withCredentials: true }

    const responce = await axios.post(url, newResearchWork, options)

    return responce.data
  } catch (error) {
    throw error
  }
}

// export async function apiEditResearchWork(id, updatedResearchWork) {
//   try {
//     const url = `${process.env.REACT_APP_HOST}/api/researchWorks/edit/${id}`
//     const options = { withCredentials: true }

//     const responce = await axios.post(url, updatedResearchWork, options)

//     return responce.data
//   } catch (error) {
//     throw error
//   }
// }

// export async function apiDeleteResearchWork(id) {
//   try {
//     const url = `${process.env.REACT_APP_HOST}/api/researchWorks/delete`
//     const options = { withCredentials: true, params: { id } }

//     const responce = await axios.get(url, options)

//     return responce.data
//   } catch (error) {
//     throw error
//   }
// }
