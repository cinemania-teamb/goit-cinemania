import axios from 'axios';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { renderRating } from './catolog.js';

const list = document.querySelector('.library-list');
const loadMore = document.querySelector('.load-more');

const api_key = '4e64f2e0a197aa7c5d1170773553320c';

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

function renderFilmsPage() {
  const startIndex = (currentPage - 1) * FILMS_PER_PAGE;
  const endIndex = startIndex + FILMS_PER_PAGE;
  const filmsToShow = filteredFilms.slice(startIndex, endIndex);

  filmsToShow.forEach(film => {
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

  if (endIndex >= filteredFilms.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    const initialFilms = films.slice(startIndex, endIndex);
    renderFilmsLibrary(initialFilms);
    loadMore.style.display = 'block';
    loadMore.addEventListener('click', () => {
      startIndex += 9;
      const nextFilms = films.slice(startIndex, startIndex + endIndex);

      if (nextFilms.length === 0) {
        loadMore.style.display = 'none';
        return;
      }

      renderFilmsLibrary(nextFilms);

      if (startIndex + endIndex >= films.length) {
        loadMore.style.display = 'none';
      }
    });
  }
}

const renderFilmsLibrary = images => {
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
};
list.addEventListener('click', async e => {
  if (e.target.nodeName === 'LI') {
    const id = e.target.id;
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
      );
      modalUi(response.data);
    } catch (error) {
      console.log(error);
    }
  }
});

renderLibrary();

const modalUi = movie => {
  const instance = basicLightbox.create(`
            <form id="movie-form">
            <p class="close">&#10006;</p>
              <img src="https://image.tmdb.org/t/p/w500/${
                movie.poster_path
              }" alt="${movie.title}">
              <div>
                <h2>${movie.title.toUpperCase()}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Vote/Votes</th>
                            <td><span class="vote">${Math.round(
                              movie.vote_average
                            )}</span> / <span class="vote">${
    movie.vote_count
  }</span></td>
                        </tr>
                        
                    </thead>
                    <tbody>
                        <tr>
                            <th>Popularity</th>
                            <td>${movie.popularity}</td>
                        </tr>
                        <tr>
                            <th>Genre</th>
                            <td>${movie.genres
                              .map(genre => genre.name)
                              .join(' ')}</td>
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
  });
  document.addEventListener('keyup', function (e) {
    if (e.code === 'Escape') {
      instance.close();
    }
  });
  const movieForm = document.getElementById('movie-form');

  movieForm.addEventListener('submit', e => {
    e.preventDefault();

    const movies = getLocalStorageFilms();
    const updatedMovies = movies.filter(movieItem => movieItem.id !== movie.id);
    localStorage.setItem('movies', JSON.stringify(updatedMovies));

    const newMovies = updatedMovies
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

    list.innerHTML = newMovies;
    instance.close();
  });
};
