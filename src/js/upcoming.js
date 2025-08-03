import debounce from 'lodash.debounce';
import axios from 'axios';
export const API_KEY = '41b8f9437bf3f899281f8a3f9bdc0891';

export const API_BAERER =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODU0Y2RkODdhYTkwNTNjYTAwMjI5ZmVhNzNlNTkyNSIsInN1YiI6IjYxODZmYWFkZmU2MzE4MDA2NDgzZTdkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vm-UaTyMPJ2HhXiSRvz-VpPqqqKEF-3PBdhfYlg5v3g';

export const STORAGE_KEY = 'myLibraryFilms';


// Yardımcı fonksiyonlar
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function roundToTen(number) {
  return Math.floor(number * 10) / 10;
}

function findFilmAtStorage(key, id) {
  const savedFilms = JSON.parse(localStorage.getItem(key));
  return savedFilms?.find(film => film.id === Number(id)) || null;
}

// weekly-trends-genres'dan alınacak fonksiyon
function validateGenres(genre_ids, genres_list) {
  // Bu fonksiyonun tam içeriği sağlanmadığı için, örnek bir dönüş değeri varsayılmıştır.
  // Gerçek uygulamanızda bu fonksiyonu doğru bir şekilde doldurmanız gerekir.
  if (!genres_list) return 'Genre information not available';
  const genreNames = genre_ids.map(id => {
    const genre = genres_list.find(g => g.id === id);
    return genre ? genre.name : 'Unknown';
  });
  return genreNames.join(', ');
}

// API servisi
const upcomingMoviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie/upcoming',
  headers: { Authorization: `Bearer ${API_BAERER}` },
});

async function getUpcomingMovies() {
  const response = await upcomingMoviesApi.get();
  return response.data.results;
}

// İşaretleme oluşturma
function careateUpcomingMarkup(film) {
  const {
    backdrop_path,
    poster_path,
    title,
    release_date,
    popularity,
    vote_count,
    vote_average,
    genre_ids,
    overview,
    id,
  } = film;

  const isSaved = findFilmAtStorage(STORAGE_KEY, id);
  const btnAttribute = isSaved ? 'remove' : 'add';
  const btnText = isSaved ? 'Remove from my library' : 'Add to my library';
  
  const imgPath = window.screen.width < 768 ? poster_path : backdrop_path;
  const transformedDate = release_date.replaceAll('-', '.');
  const roundedPopularity = roundToTen(popularity);

  const genres = validateGenres(
    genre_ids,
    JSON.parse(localStorage.getItem('genres'))
  );

  return `
    <div class='upcoming-card__figure'>
      <div class='upcoming-card__layout'></div>
        <img
          src="https://image.tmdb.org/t/p/original${imgPath}"
          alt="${title}"
          loading='lazy'
          class='upcoming-card__img'
        > 
      </div>
    </div>
    <div class='upcoming-card__body'>
      <h3 class="upcoming-card__title">${title}</h3>
      <div class='metrics-list__main-container'>
        <ul class="list metrics-list">
          <li class="metrics-list__item">
            <p class="metrics-text">Release date</p>
            <p class="metrics-text metrics-text--date">${transformedDate}</p>
          </li>
          <li class="metrics-list__item">
            <p class="metrics-text">Vote / Votes</p>
            <p class="metrics-text metrics-text--vote">
              <span class="vote-wrapper">${vote_average}</span>
              /
              <span class="vote-wrapper">${vote_count}</span>
            </p>
          </li>
          <li class="metrics-list__item">
            <p class="metrics-text">Popularity</p>
            <p class="metrics-text">${roundedPopularity}</p>
          </li>
          <li class="metrics-list__item">
            <p class="metrics-text">Genre</p>
            <p class="metrics-text">${genres}</p>
          </li>
        </ul>
      </div>
      <h4 class="upcoming-card__subtitle metrics-text">ABOUT</h4>
        <p class="upcoming-card__text">${overview}</p>
      <button class="btn" type="button" data-id=${id} data-${btnAttribute}>${btnText}</button>
    </div>`;
}

// Resim işleme
function handleUpcomingImg({ poster_path, backdrop_path, title }) {
  const img = document.querySelector('.upcoming-card__img');
  if (!img) return console.log('no upcoming section');

  const posterLink = `https://image.tmdb.org/t/p/original${poster_path}`;
  const backdropLink = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  if (window.screen.width < 768 && img.src !== posterLink) {
    return (img.src = posterLink);
  }

  if (window.screen.width >= 768 && img.src !== backdropLink) {
    return (img.src = backdropLink);
  }
}

// Ana işlev
const upcomingEl = document.querySelector('.upcoming-card');

window.addEventListener('DOMContentLoaded', handleUpcoming);

async function handleUpcoming() {
  try {
    const upcomingMovies = await getUpcomingMovies();
    const randomMovie = getRandomItem(upcomingMovies);
    
    const markup = careateUpcomingMarkup(randomMovie);
    
    updateUpcoming(markup);

    const debouncedImgHandler = debounce(
      () => handleUpcomingImg(randomMovie),
      200
    );

    window.addEventListener('resize', debouncedImgHandler);
    
  } catch (error) {
    console.error('error:', error);
    ('ERR_BAD_REQUEST');
  }
}

function updateUpcoming(markup = '') {
  upcomingEl.innerHTML = markup;
}
