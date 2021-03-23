import './styles.css';
import templates from './templates/templates.hbs';
import apiService from './apiService.js';
import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox'
import { alert, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';
import 'material-design-icons/iconfont/material-icons.css';

defaultModules.set(PNotifyMobile, {});

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.gallery-btn')

formRef.addEventListener('submit', searchForm)
galleryRef.addEventListener('click', openModal)

function searchForm(event) {
  event.preventDefault();
  apiService.query = event.currentTarget.elements.query.value;
  galleryRef.innerHTML = '';
  apiService.resetPage();
  onImg();
}

function onImg() {
  apiService.fetchImages().then(images => {
    if (images.length === 0) {
      alert({
        text: 'No matches found! Try again',
        type: 'error',
        delay: 2000,
        stack: new Stack({
          dir1: 'up',
        }),
      });
    }
    galleryRef.insertAdjacentHTML('beforeend', templates(images));
  });
}

loadMoreBtn.addEventListener('click', event => {
  apiService
    .fetchImages()
    .then(onImg)
    .then(() => {
      window.scrollTo(0, galleryRef.offsetHeight);
    });
});

function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const img = event.target.getAttribute('data-source');
  const instance = basicLightbox.create(`<img src="${img}">`);
  instance.show();
}