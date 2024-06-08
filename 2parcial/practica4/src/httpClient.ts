import axios from 'axios';

export const fetchData = async (): Promise<any> => {
  try {
    const response = await axios.get('http://localhost:3000/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
