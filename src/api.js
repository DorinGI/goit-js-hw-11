import axios from 'axios';

const API_KEY = '45520163-d2f122f368fc1ea2470b2cc6a';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 20,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error', error);
    throw error;
  }
};
