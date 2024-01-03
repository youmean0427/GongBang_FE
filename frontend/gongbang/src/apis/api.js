import axios from 'axios';



export const getCoffeeCafesAPI = async () => {
    const { data } = await axios.get('/api/coffeecafes');
    return data;
}

export const getCoffeeCafeDetailAPI = async (id) => {
  const { data } = await axios.get(`/api/coffeecafe/${id}`);
  return data;
}

export const getCoffeeCafeDetailReviewCreateAPI = async (id, data) => {
  const response = await axios.post(`/api/coffeecafe/${id}/review/create`, data, {headers: {
      'Content-Type': 'multipart/form-data',
    },});
  return response;
}


export const userAPI = async () => {
  const { data } = await axios.get('/accounts/user/');
  return data;
}

export const signupAPI = async (data) => {
    const response = await axios.post('/accounts/registration/', data, {headers: {
        'Content-Type': 'application/json',
      },});
    return response;
}

export const loginAPI = async (data) => {
    const response = await axios.post('/accounts/login/', data, {headers: {
        'Content-Type': 'application/json', 
      },
    });
    return response;
}

export const logoutAPI = async (data) => {
  const response = await axios.post('/accounts/logout/', data, {headers: {
      'Content-Type': 'application/json',
    },});
  return response;
}
