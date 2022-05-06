import axios from 'axios';

const API_KEY = '26342671-26c26899736dd731f47ba4106';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImagesApi = ({ q, page }) => {
  axios.defaults.params = {
    q,
    page,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
    key: API_KEY,
    // colors: 'black, white',
  };
  return axios.get().then(({ data }) => {
    // console.log(data);
    return data;
  });
};
