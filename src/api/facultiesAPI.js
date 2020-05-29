import axios from 'axios';

export async function apiGetAllFaculties() {

  try {
    const url = `${process.env.REACT_APP_HOST}/api/faculties/list`;

    const responce = await axios.get(url, { withCredentials: true, timeout: 3000 });

    return responce.data;

  } catch (error) {
    throw error;
  }
}

export async function apiGetFacultyDepartments(id) {

  try {
    const url = `${process.env.REACT_APP_HOST}/api/faculties/departments`;

    const responce = await axios.get(url, { params: { id }, withCredentials: true, timeout: 3000 });

    return responce.data;

  } catch (error) {
    throw error;
  }
}