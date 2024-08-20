import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './api';
import { Notify } from 'notiflix';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

let page = 1;
let query = '';
const parameters = {
  position: 'center-center',
  timeout: 4000,
  width: '550px',
  fontSize: '30px',
};

const onFormSubmit = e => {
  e.preventDefault();
  const query = e.currentTarget.elements.searchQuery.value;
  console.log(query);
  if (query === '') {
    Notify.info('Please enter something to search!', parameters);
    return;
  } else {
    onSearch(query);
  }
};

const onSearch = async query => {
  const images = await fetchImages(query);
  console.log(images);

  if (images.totalHits === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
      parameters
    );
  } else {
    Notify.info(`We found ${images.totalHits} images.`, parameters);
    gallery.innerHTML = '';
    renderGallery(images.hits);
    loadMoreButton.style.display = 'block';
    lightbox.refresh();
  }
};

const onLoadMore = async query => {
  page++;
  const images = await fetchImages(query, page);
  renderGallery(images.hits);
  lightbox.refresh();
};

const renderGallery = images => {
  gallery.insertAdjacentHTML(
    'beforeend',
    images
      .map(
        ({
          id,
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `<div key='${id}' class="photo-card">
            <div class="image_wrap">
                <a href='${largeImageURL}'>    
                    <img src="${webformatURL}" alt="${tags}" width="250" loading="lazy" />
                </a>    
            </div>
            <div class="info">
                <p class="info-item">
                <b>Likes ${likes}</b>
                </p>
                <p class="info-item">
                <b>Views ${views}</b>
                </p>
                <p class="info-item">
                <b>Comments ${comments}</b>
                </p>
                <p class="info-item">
                <b>Downloads ${downloads}</b>
                </p>
            </div>
        </div>`
      )
      .join('')
  );
};

form.addEventListener('submit', onFormSubmit);
loadMoreButton.addEventListener('click', onLoadMore);

let lightbox = new SimpleLightbox('.image_wrap a', {
  captionsData: 'alt',
  captionDelay: 250,
});
