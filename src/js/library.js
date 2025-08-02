import openLibraryModal from './library-modal.js';
import eventBus from './eventBus.js';

const filmList = document.querySelector('.library__gallery');
const emptyState = document.getElementById('empty-state');
const tabs = document.querySelectorAll('.tab');

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

function renderRating(rating) {
  const roundedRating = Math.round(rating);
  let stars = '';

  switch (roundedRating) {
    case 0:
      stars = `${startEmpty.repeat(5)}`;
      break;
    case 1:
      stars = `${startHalf}${startEmpty.repeat(4)}`;
      break;
    case 2:
      stars = `${startFull}${startEmpty.repeat(4)}`;
      break;
    case 3:
      stars = `${startFull}${startHalf}${startEmpty.repeat(3)}`;
      break;
    case 4:
      stars = `${startFull.repeat(2)}${startEmpty.repeat(3)}`;
      break;
    case 5:
      stars = `${startFull.repeat(2)}${startHalf}${startEmpty.repeat(2)}`;
      break;
    case 6:
      stars = `${startFull.repeat(3)}${startEmpty.repeat(2)}`;
      break;
    case 7:
      stars = `${startFull.repeat(3)}${startHalf}${startEmpty}`;
      break;
    case 8:
      stars = `${startFull.repeat(4)}${startEmpty}`;
      break;
    case 9:
      stars = `${startFull.repeat(4)}${startHalf}`;
      break;
    case 10:
      stars = `${startFull.repeat(5)}`;
      break;
    default:
      stars = `${startEmpty.repeat(5)}`;
  }

  return `<div class="rating-stars">${stars}</div>`;
}

function renderFilms() {
  const films = getLocalStorageFilms();
  filmList.innerHTML = '';

  if (films.length === 0) {
    filmList.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  filmList.style.display = 'flex';
  emptyState.style.display = 'none';

  films.forEach(film => {
    const card = document.createElement('li');
    card.className = 'film-card';
    card.style.cursor = 'pointer';
    card.setAttribute('data-id', film.id);

    const stars = renderRating(film.vote_average);

    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500/${film.poster_path}" alt="${film.title} poster" />
      <div class="info">
        <div class="title">${film.title}</div>
        <div class="meta">${film.genres}</div>
        <div class="desc">${film.overview}</div>
        <div class="meta">IMDB: ${film.vote_average} (${film.vote_count} oy)</div>
        ${stars}
      </div>
    `;

    card.addEventListener('click', () => {
      if (typeof film.genres === 'string') {
        film.genres = film.genres
          .split(',')
          .map(name => ({ name: name.trim() }));
      }
      openLibraryModal(film);
    });

    filmList.appendChild(card);
  });
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderFilms();
  });
});

renderFilms();

eventBus.addEventListener('libraryUpdated', () => {
  console.log('libraryUpdated event received — rendering films again');
  renderFilms();
});
