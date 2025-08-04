import axios from 'axios';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { renderRating } from './catolog.js';

const list = document.querySelector('.library-list');
const loadMore = document.querySelector('.load-more');
const CATEGORY_SELECT = document.getElementById('category');

const api_key = '4e64f2e0a197aa7c5d1170773553320c';
let startIndex = 0;
const endIndex = 9;
let currentFilms = [];

function getLocalStorageFilms() {
  return JSON.parse(localStorage.getItem('movies')) || [];
}

function renderFilmsLibrary(images, clear = false) {
  if (clear) list.innerHTML = '';
  const newImages = images
    .map(({ id, title, poster_path, year, vote_average, genres }) => {
      const date = year.split('-')[0];
      const newRating = renderRating(Math.floor(vote_average));
      return (
        poster_path &&
        `<li id="${id}" style="background-image: url(https://image.tmdb.org/t/p/w500/${poster_path});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${title.toUpperCase()} <span style="color:#B7B7B7">${genres} | ${date}</span></p>
              ${newRating}
          </div>
      </li>`
      );
    })
    .join('');
  list.insertAdjacentHTML('beforeend', newImages);
}

function updateLoadMoreVisibility() {
  if (startIndex + endIndex >= currentFilms.length) {
    loadMore.style.display = 'none';
  } else {
    loadMore.style.display = 'block';
  }
}

function renderLibrary(films = getLocalStorageFilms()) {
  currentFilms = films;
  startIndex = 0;
  if (films.length === 0) {
    list.innerHTML = `<li class="empty-library">OOPS... We are very sorry! You don’t have any movies at your library.. <a href="./catolog.html" class="started">Get Started</a></li>`;
    loadMore.style.display = 'none';
    return;
  }
  const initialFilms = films.slice(startIndex, endIndex);
  renderFilmsLibrary(initialFilms, true);
  updateLoadMoreVisibility();
}

loadMore.addEventListener('click', () => {
  startIndex += endIndex;
  const nextFilms = currentFilms.slice(startIndex, startIndex + endIndex);
  renderFilmsLibrary(nextFilms);
  updateLoadMoreVisibility();
});

CATEGORY_SELECT.onchange = function (e) {
  const films = getLocalStorageFilms();
  const category = e.target.value;
  const newFilms = films.filter(film =>
    film.genres.split(',').includes(category)
  );
  renderLibrary(newFilms);
};

list.addEventListener('click', async e => {
  const li = e.target.closest('li[id]');
  if (!li) return;
  const id = li.id;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
    );
    modalUi(response.data);
  } catch (error) {
    console.log(error);
  }
});

function modalUi(movie) {
  const instance = basicLightbox.create(`
    <form id="movie-form">
      <p class="close">&#10006;</p>
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${
    movie.title
  }">
      <div>
        <h2>${movie.title.toUpperCase()}</h2>
        <table>
          <thead>
            <tr>
              <th>Vote/Votes</th>
              <td><span class="vote">${Math.round(
                movie.vote_average
              )}</span> / <span class="vote">${movie.vote_count}</span></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Popularity</th>
              <td>${movie.popularity}</td>
            </tr>
            <tr>
              <th>Genre</th>
              <td>${movie.genres.map(genre => genre.name).join(' ')}</td>
            </tr>
          </tbody>
        </table>
        <h3>ABOUT</h3>
        <p class="modal-info">${movie.overview}</p>
        <button class="movie-submit" type="submit">Remove From My Library</button>
      </div>
    </form>
  `);
  instance.show();

  const closeButton = document.querySelector('.close');
  closeButton.addEventListener('click', () => {
    instance.close();
    document.removeEventListener('keyup', escHandler);
  });

  function escHandler(e) {
    if (e.code === 'Escape') {
      instance.close();
      document.removeEventListener('keyup', escHandler);
    }
  }
  document.addEventListener('keyup', escHandler);

  const movieForm = document.getElementById('movie-form');
  movieForm.addEventListener('submit', e => {
    e.preventDefault();
    const movies = getLocalStorageFilms();
    const updatedMovies = movies.filter(movieItem => movieItem.id !== movie.id);
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
    renderLibrary(updatedMovies);
    instance.close();
    document.removeEventListener('keyup', escHandler);
  });
}

// Highlight active nav link
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href').split('/').pop();
    if (currentPage === linkHref) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

renderLibrary();
