import { getImagesByQuery } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  createGallery,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.getElementById('text');
const loadMoreBtn = document.getElementById('myButton');

let page = 1;
let query = '';
const perPage = 15;

function setButtonLoading(isLoading) {
  if (isLoading) {
    loadMoreBtn.classList.add('loading');
    loadMoreBtn.disabled = true;
  } else {
    loadMoreBtn.classList.remove('loading');
    loadMoreBtn.disabled = false;
  }
}

function scrollAfterLoad() {
  const galleryItem = document.querySelector('.gallery li');
  if (galleryItem) {
    const { height } = galleryItem.getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: 'smooth' });
  }
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = input.value.trim();
  input.value = '';
  page = 1;
  clearGallery();
  hideLoadMoreButton();

  if (!query) {
    iziToast.error({
      message: 'Enter search query!',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  try {
    showLoader();
    const data = await getImagesByQuery(query, page);
    hideLoader();

    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
        message: 'No images found. Try another query.',
        position: 'topRight',
        timeout: 3000,
      });
      return;
    }

    createGallery(data.hits);

    if (page * perPage >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 3000,
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Something went wrong. Try again later.',
      position: 'topRight',
      timeout: 3000,
    });
    console.error(error);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  setButtonLoading(true);
  try {
    const data = await getImagesByQuery(query, page);
    setButtonLoading(false);

    if (!data.hits || data.hits.length === 0) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 3000,
      });
      return;
    }

    createGallery(data.hits);
    scrollAfterLoad();

    if (page * perPage >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 3000,
      });
    }
  } catch (error) {
    setButtonLoading(false);
    iziToast.error({
      message: 'Something went wrong. Try again later.',
      position: 'topRight',
      timeout: 3000,
    });
    console.error(error);
  }
});
