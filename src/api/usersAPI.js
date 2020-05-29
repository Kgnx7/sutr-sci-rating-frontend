import axios from 'axios';

export async function apiGetAllUsers(filter, offset, limit) {

  try {
    const url = `${process.env.REACT_APP_HOST}/api/users/list`;

    const responce = await axios.get(url, { params: { filter, offset, limit }, withCredentials: true, timeout: 3000 });

    return responce.data;

  } catch (error) {
    throw error;
  }
}

export async function apiGetUsersByDepartment(departmentId) {

  try {
    const url = `${process.env.REACT_APP_HOST}/api/departments/staff`;

    const responce = await axios.get(url, { params: { id: departmentId }, withCredentials: true, timeout: 30000 });

    return responce.data;

  } catch (error) {
    throw error;
  }
}