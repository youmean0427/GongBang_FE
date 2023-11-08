import axios from 'axios';

export const getCoffeeCafesAPI = async () => {
    const { data } = await axios.get('/api/coffeecafes');
    return data;
}


export const signupAPI = async (data) => {
    const response = await axios.post('/accounts/signup', data, {headers: {
        'Content-Type': 'application/json',
      },});
    return response;
}

export const loginAPI = async (data) => {
    const response = await axios.post('/accounts/login', data, {headers: {
        'Content-Type': 'application/json',
      },});
    return response;
}


export const userInfoAPI = async (id) => {
  const { data } = await axios.get(`accounts/account/${id}`, id);
  return data;
}
