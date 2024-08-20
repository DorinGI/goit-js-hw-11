import { fetchImages } from './api';

const form = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('.load-more');

let page = 1;
let query = '';

const onFormSubmit = e => {
  e.preventDefault();
  const query = e.currentTarget.elements.searchQuery.value;
  console.log(query);
  onSearch(query);
};

const onSearch = async query => {
  const images = await fetchImages(query);
  console.log(images);
  renderGallery(images.hits);
  loadMoreButton.style.display = 'block';
};

const onLoadMore = async query => {
  page++;
  const images = await fetchImages(query, page);
  renderGallery(images.hits);
};

const renderGallery = images => {
  const gallery = document.querySelector('.gallery');
  gallery.insertAdjacentHTML(
    'beforeend',
    images
      .map(
        ({
          id,
          webformatURL,
          largeImageUrl,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `<div key='${id}' class="photo-card">
            <a href='${largeImageUrl}' target='_blank'>    
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>    
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
