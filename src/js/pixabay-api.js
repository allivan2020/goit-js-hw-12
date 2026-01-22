// function getImagesByQuery(query);
// Ця функція повинна приймати один параметр query (пошукове слово, яке є рядком), здійснювати HTTP-запит і повертати значення властивості data з отриманої відповіді.

import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';
const apiKey = '54180070-46282e1a529b434bb638d8dc5';

export function getImagesByQuery(query) {
  return axios
    .get(baseURL, {
      params: {
        key: apiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
      },
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });
}
