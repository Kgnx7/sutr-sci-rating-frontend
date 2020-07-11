import axios from 'axios'

export async function apiGetRiaTypes(filter, offset, limit) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/riaTypes/list`

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

export async function apiGetRiaType(riaTypeId) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/riaTypes/get/${riaTypeId}`

    const responce = await axios.get(url, {
      withCredentials: true,
      timeout: 3000,
    })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiCreateRiaType(newRiaType) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/riaTypes/create`

    const responce = await axios.post(url, newRiaType, {
      withCredentials: true,
      timeout: 3000,
    })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiEditRiaType(updatedRiaType) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/riaTypes/edit/${updatedRiaType.id}`

    const responce = await axios.post(url, updatedRiaType, {
      withCredentials: true,
      timeout: 3000,
    })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiAddRiaTypeProperty(newProperty) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/riaTypes/addProperty`

    const responce = await axios.post(url, newProperty, {
      withCredentials: true,
      timeout: 3000,
    })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiDeleteRiaType(riaTypeId) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/riaTypes/delete/${riaTypeId}`

    const responce = await axios.get(url, { withCredentials: true, timeout: 3000 })

    return responce.data
  } catch (error) {
    throw error
  }
}
