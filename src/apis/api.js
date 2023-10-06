import axios from 'axios';

export const getCoffeeCafesAPI = async () => {
    const { data } = await axios.get('/coffeecafes');
    return data;
}