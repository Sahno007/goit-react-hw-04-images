const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38932513-f34158b41be609c43e0a8ac7b';

function fetchPixabay(searchText, currentPage) {
  return fetch(
    `${BASE_URL}?q=${searchText}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
}
export default fetchPixabay;