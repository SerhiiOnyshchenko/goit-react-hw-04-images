import PropTypes from 'prop-types';

const MY_KEY = '26722217-c4f85004f69e1760da5af6d6e';
const API_URL = 'https://pixabay.com/api/';
const axios = require('axios').default;

async function SearchApi(name, page, per_page) {
   const response = await axios.get(
      `${API_URL}?key=${MY_KEY}&q=${name}&image_type=photo&orientation=horizontal&page=${page}&per_page=${per_page}`
   );
   if (!response.data.total) {
      return Promise.reject(new Error(`No image with name ${name}`));
   }
   return response.data;
}

SearchApi.propTypes = {
   name: PropTypes.string.isRequired,
   page: PropTypes.number.isRequired,
   per_page: PropTypes.number.isRequired,
};
export default SearchApi;
