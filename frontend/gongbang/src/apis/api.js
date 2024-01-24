import axios from 'axios';



export const getCoffeeCafesAPI = async (type) => {
    const { data } = await axios.get(`/api/coffeecafes/${type}`);
    return data;
}

export const getCoffeeCafeDetailAPI = async (id) => {
  const { data } = await axios.get(`/api/coffeecafe/${id}`);
  return data;
}

export const getCoffeeCafeDetailReviewCreateAPI = async (id, data, type) => {
  const response = await axios.post(`/api/coffeecafe/${id}/review/${type}`, data, {headers: {
      'Content-Type': 'multipart/form-data',
    },});
  return response;
}

export const getReview = async(id) => {
  const { data } = await axios.get(`/api/coffeecafe/review/${id}`)
  return data
}

export const deleteReview = async(id) => {
  const response = await axios.delete(`/api/coffeecafe/review/${id}/delete`)
  return response
}

export const deleteReviewImage = async(id) => {
  const response = await axios.delete(`/api/coffeecafe/review/image/${id}`)
  return response
}

export const coffeeCafeCreateAPI = async (data) => {
  const response = await axios.post(`/api/coffeecafe/create`, data,
  {headers: {
    'Content-Type' : 'multipart/form-data',
  },})
  return response
}

export const getAllReveiw = async () => {
  const { data } = await axios.get('/api/coffeecafe/review')
  return data
}

// Account

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
