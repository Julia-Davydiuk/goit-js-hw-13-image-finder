import './styles.css';
import templates from './templates/templates.hbs';
import apiService from './apiService.js';
import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox'

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.gallery-btn')

formRef.addEventListener('submit', searchForm)
galleryRef.addEventListener('click', openModal)

function searchForm(event) {
  event.preventDefault();
  apiService.query = event.currentTarget.elements.query.value;
  galleryRef.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');
  onImg();
}

function onImg() {
  apiService
  .fetchImages()
  .then(images => {
    if(images.length > 10) loadMoreBtn.classList.remove('is-hidden');
   galleryRef.insertAdjacentHTML('beforeend', templates(images));
  });
}

function scrollToNewElements() {
  const totalScrollHeight = galleryRef.clientHeight + 80
  setTimeout(() => {
    window.scrollTo({
      top: totalScrollHeight,
      behavior: 'smooth',
    });
  }, 100);
}

loadMoreBtn.addEventListener('click', event => {
  apiService
    .fetchImages()
    .then(onImg)
    .then(scrollToNewElements);
});

function openModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const img = event.target.getAttribute('data-source');
  const instance = basicLightbox.create(`<img src="${img}">`);
  instance.show();
}