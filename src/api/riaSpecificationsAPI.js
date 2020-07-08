import axios from 'axios'

export async function apiGetRiaSpecifications(filter, offset, limit) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/riaSpecifications/list`

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

export async function apiCreateRiaSpecification(newRiaSpecification) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/riaSpecifications/create`

    const responce = await axios.post(url, newRiaSpecification, {
      withCredentials: true,
      timeout: 3000,
    })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiDeleteRiaSpecification(riaSpecificationId) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/riaSpecifications/delete/${riaSpecificationId}`

    const responce = await axios.get(url, { withCredentials: true, timeout: 3000 })

    return responce.data
  } catch (error) {
    throw error
  }
}
