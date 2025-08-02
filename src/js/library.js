import openLibraryModal from './library-modal.js';
import eventBus from './eventBus.js';

const filmList = document.querySelector('.library__gallery');
const emptyState = document.getElementById('empty-state');
const tabs = document.querySelectorAll('.tab');

function getLocalStorageFilms() {
  return JSON.parse(localStorage.getItem('movies')) || [];
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

    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500/${film.poster_path}" alt="${film.title} poster" />
      <div class="info">
        <div class="title">${film.title}</div>
        <div class="meta">${film.genres}</div>
        <div class="desc">${film.overview}</div>
        <div class="meta">IMDB: ${film.vote_average} (${film.vote_count} oy)</div>
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
