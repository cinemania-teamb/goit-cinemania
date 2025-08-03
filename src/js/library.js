import openLibraryModal from './library-modal.js';
import eventBus from './eventBus.js';

const filmList = document.querySelector('.library__gallery');
const emptyState = document.getElementById('empty-state');
const filterSelect = document.querySelector('.filter__select');
const loadMoreBtn = document.querySelector('.btn--load-more');
const tabs = document.querySelectorAll('.tab');

const FILMS_PER_PAGE = 6;
let currentPage = 1;
let filteredFilms = [];

const startEmpty = `<svg class="icon" width="18" height="18">
  <use href="./icons.svg#icon-star-outline"></use>
</svg>`;
const startHalf = `<svg class="icon" fill="#F87719" width="18" height="18">
  <use href="./icons.svg#icon-star-half"></use>
</svg>`;
const startFull = `<svg class="icon" fill="#F87719" width="18" height="18">
  <use href="./icons.svg#icon-star"></use>
</svg>`;

function getLocalStorageFilms() {
  return JSON.parse(localStorage.getItem('movies')) || [];
}
let startIndex = 0;
const endIndex = 9;

const renderLibrary = () => {
  const films = getLocalStorageFilms();
  if (films.length === 0) {
    list.innerHTML = `<li class="empty-library">OOPS... We are very sorry! You don’t have any movies at your library..</li>`;
    return;
  }
  if (films.length < 9) {
    loadMore.style.display = 'none';
    renderFilmsLibrary(films);
  } else {
    loadMoreBtn.style.display = 'block';
  }
};

function applyFilter() {
  const selectedGenre = filterSelect.value;
  const allFilms = getLocalStorageFilms();

  if (selectedGenre === '') {
    filteredFilms = allFilms;
  } else {
    filteredFilms = allFilms.filter(film => {
      if (typeof film.genres === 'string') {
        return film.genres.toLowerCase().includes(selectedGenre.toLowerCase());
      }
      return false;
    });
  }

  currentPage = 1;
  filmList.innerHTML = '';

  if (filteredFilms.length === 0) {
    filmList.style.display = 'none';
    emptyState.style.display = 'block';
    loadMoreBtn.style.display = 'none';
  } else {
    filmList.style.display = 'flex';
    emptyState.style.display = 'none';
    renderFilmsPage();
  }
}

filterSelect.addEventListener('change', applyFilter);

loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  renderFilmsPage();
});

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    applyFilter();
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.split('/').pop();
  links.forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

function initLibrary() {
  filteredFilms = getLocalStorageFilms();
  currentPage = 1;
  applyFilter();
}

eventBus.addEventListener('libraryUpdated', () => {
  console.log('libraryUpdated event received — rendering films again');
  initLibrary();
});

initLibrary();
