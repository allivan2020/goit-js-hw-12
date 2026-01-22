import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';
const apiKey = '54180070-46282e1a529b434bb638d8dc5';

export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get(baseURL, {
    params: {
      key: apiKey,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    },
  });

  return response.data;
}
