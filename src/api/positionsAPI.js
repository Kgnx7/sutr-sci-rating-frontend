import axios from 'axios'

export async function apiGetAllPositions() {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/positions/list`

    const responce = await axios.get(url, { withCredentials: true, timeout: 3000 })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiDeletePosition(positionId) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/positions/delete/${positionId}`

    const responce = await axios.get(url, { withCredentials: true, timeout: 3000 })

    return responce.data
  } catch (error) {
    throw error
  }
}

export async function apiCreatePosition(newPosition) {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/positions/create`

    const responce = await axios.post(url, newPosition, { withCredentials: true, timeout: 3000 })

    return responce.data
  } catch (error) {
    throw error
  }
}
