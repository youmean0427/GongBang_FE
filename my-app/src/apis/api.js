import axios from 'axios';

export const getCoffeeCafesAPI = async () => {
    const { data } = await axios.get('/api/coffeecafes/');
    return data;
}


export const signupAPI = async (data) => {
    const response = await axios.post('/accounts/signup', data, {headers: {
        'Content-Type': 'application/json',
      },});
    return response;
}