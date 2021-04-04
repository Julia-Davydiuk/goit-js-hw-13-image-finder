import './styles.css';
import templates from './templates/templates.hbs';
import apiService from './apiService.js';
import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox'

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('.search-form');
const sentinelRef = document.querySelector('#sentinel');

formRef.addEventListener('submit', searchForm)
galleryRef.addEventListener('click', openModal)

function searchForm(event) {
  event.preventDefault();
  apiService.query = event.currentTarget.elements.query.value;
  galleryRef.innerHTML = '';
  onImg();
}

function onImg() {
  apiService
  .fetchImages()
  .then(images => 
    galleryRef.insertAdjacentHTML('beforeend', templates(images))
    )
}

const onEntry = entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting && apiService.query !== '') {
     onImg();
    }
  });
};

const options = {
  rootMargin: '150px'
};

const observer = new IntersectionObserver(onEntry, options)
observer.observe(sentinelRef);

function openModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const img = event.target.getAttribute('data-source');
  const instance = basicLightbox.create(`<img src="${img}">`);
  instance.show();
}