import axios from 'axios';

export async function apiGetAllUsers() {

  try {
    const url = `${process.env.REACT_APP_HOST}/api/users/list`;

    const responce = await axios.get(url, { withCredentials: true, timeout: 3000 });

    return responce.data;

  } catch (error) {
    throw error;
  }
}

export async function apiGetUsersByDepartment(departmentId) {

  try {
    const url = `${process.env.REACT_APP_HOST}/api/departments/staff`;

    const responce = await axios.get(url, { params: { id: departmentId }, withCredentials: true, timeout: 15000 });

    return responce.data;

  } catch (error) {
    throw error;
  }
}