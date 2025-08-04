import axios from 'axios';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { renderRating } from './catolog.js';

const list = document.querySelector('.library-list');
let loadMore = document.querySelector('.load-more');

const api_key = '4e64f2e0a197aa7c5d1170773553320c';

function getLocalStorageFilms() {
  return JSON.parse(localStorage.getItem('movies')) || [];
}
let startIndex = 0;
const endIndex = 9;

document.getElementById("category").onchange = function (e) {
  list.innerHTML = ""
  const films = getLocalStorageFilms()

  const category = e.target.value

  const newFilms = []

  films.forEach(film => {
    if (film.genres.split(",").includes(category)) {
      newFilms.push(film)
    }
  })
  if (newFilms.length <= 9) {
    loadMore.style.display = 'none';
    renderFilmsLibrary(newFilms);
  } else {
    
    startIndex = 0;
    const initialFilms = newFilms.slice(startIndex, endIndex);
    renderFilmsLibrary(initialFilms);
    

    // Remove previous event listeners to prevent stacking
    const newLoadMore = loadMore.cloneNode(true);
    loadMore.parentNode.replaceChild(newLoadMore, loadMore);
    loadMore = document.querySelector('.load-more');
    loadMore.style.display = 'block';

    loadMore.addEventListener('click', () => {
      startIndex += 9;
      const nextFilms = newFilms.slice(startIndex, startIndex + endIndex);

      if (nextFilms.length === 0) {
        loadMore.style.display = 'none';
        return;
      }

      renderFilmsLibrary(nextFilms);

      if (startIndex + endIndex >= newFilms.length) {
        loadMore.style.display = 'none';
      }
    });
  }
}

function renderLibrary() {
  const films = getLocalStorageFilms();
  if (films.length === 0) {
    list.innerHTML = `<li class="empty-library">OOPS... We are very sorry! You don’t have any movies at your library..</li>`;
    return;
  }
  if (films.length <= 9) {
    loadMore.style.display = 'none';
    renderFilmsLibrary(films);
  } else {
    let startIndex = 0;
    const endIndex = 9;
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
