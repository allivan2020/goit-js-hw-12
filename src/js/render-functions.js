import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loadMoreButton = document.getElementById('myButton');
const searchLoader = document.getElementById('search-loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      image => `
      <li class="gallery-item">
        <a href="${image.largeImageURL}">
          <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
        </a>
        <div class="info">
          <p class="info-item-text">Likes <span class="info-item-text-span">${image.likes}</span></p>
          <p class="info-item-text">Views <span class="info-item-text-span">${image.views}</span></p>
          <p class="info-item-text">Comments <span class="info-item-text-span">${image.comments}</span></p>
          <p class="info-item-text">Downloads <span class="info-item-text-span">${image.downloads}</span></p>
        </div>
      </li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoadMoreButton() {
  loadMoreButton.style.display = 'block';
}

export function hideLoadMoreButton() {
  loadMoreButton.style.display = 'none';
}

export function showLoader() {
  searchLoader.classList.add('active');
}

export function hideLoader() {
  searchLoader.classList.remove('active');
}
