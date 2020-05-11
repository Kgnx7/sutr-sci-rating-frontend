import axios from 'axios';

export async function apiLogin(email, password) {
  
  try {
    const url = `${process.env.REACT_APP_HOST}/api/auth/login`;
    const data = {
      email, 
      password
    };

    const responce = await axios.post(url, data);

    return responce.data;

  } catch (error) {
    throw error;
  }
}

export async function apiLogout() {
  try {
    const url = `${process.env.REACT_APP_HOST}/api/auth/logout`;
   
    await axios.get(url);

  } catch (error) {
    throw error;
  }
}