import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import eventBus from './eventBus.js';

const openLibraryModal = movie => {
  if (typeof movie.genres === 'string') {
    movie.genres = movie.genres.split(',').map(name => ({ name: name.trim() }));
  }

  const instance = basicLightbox.create(`
    <form id="movie-form">
      <p class="close" style="cursor:pointer;">&#10006;</p>
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${
    movie.title
  }" width="375" height="478" />
      <div>
        <h2>${movie.title.toUpperCase()}</h2>
        <table>
          <thead>
            <tr>
              <th>Vote/Votes</th>
              <td><span class="vote">${
                movie.vote_average
              }</span> / <span class="vote">${movie.vote_count}</span></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Popularity</th>
              <td>${movie.popularity}</td>
            </tr>
            <tr>
              <th>Genre</th>
              <td>${movie.genres.map(g => g.name).join(', ')}</td>
            </tr>
          </tbody>
        </table>
        <h3>ABOUT</h3>
        <p>${movie.overview}</p>
        <button class="movie-submit" type="submit">Add to my library</button>
      </div>
    </form>
  `);

  instance.show();

  document.querySelector('.close').addEventListener('click', () => {
    instance.close();
  });

  const escHandler = e => {
    if (e.key === 'Escape') {
      instance.close();
      document.removeEventListener('keyup', escHandler);
    }
  };
  document.addEventListener('keyup', escHandler);

  const movieForm = document.getElementById('movie-form');
  const movieSubmit = document.querySelector('.movie-submit');

  let movies = getLocalStorage();

  if (movies.some(m => m.id === movie.id)) {
    movieSubmit.textContent = 'Remove from my library';
  } else {
    movieSubmit.textContent = 'Add to my library';
  }

  movieForm.addEventListener('submit', e => {
    e.preventDefault();
    movies = getLocalStorage();

    if (movieSubmit.textContent === 'Remove from my library') {
      const updatedMovies = movies.filter(
        m => String(m.id) !== String(movie.id)
      );
      localStorage.setItem('movies', JSON.stringify(updatedMovies));

      eventBus.dispatchEvent(new CustomEvent('libraryUpdated'));

      instance.close();
      return;
    }

    movies.push({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      overview: movie.overview,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      popularity: movie.popularity,
      genres: movie.genres.map(g => g.name).join(','),
    });
    localStorage.setItem('movies', JSON.stringify(movies));
    movieSubmit.textContent = 'Remove from my library';

    eventBus.dispatchEvent(new CustomEvent('libraryUpdated'));
  });
};

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('movies')) || [];
}

export default openLibraryModal;
