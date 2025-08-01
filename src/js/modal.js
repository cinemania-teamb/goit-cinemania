import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const modalUi = movie => {
  const instance = basicLightbox.create(`
            <form id="movie-form">
            <p class="close">&#10006;</p>
              <img src="https://image.tmdb.org/t/p/w500/${
                movie.poster_path
              }" width="375" height="478" alt="${movie.title}">
              <div>
                <h2>${movie.title.toUpperCase()}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Vote/Votes</th>
                            <td><span class="vote">${Math.round(movie.vote_average)}</span> / <span class="vote">${movie.vote_count}</span></td>
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
              <p>${movie.overview}</p>
              <button class="movie-submit" type="submit">Add to my library</button>
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
      const movies = getLocalStorage();
      const updatedMovies = movies.filter(m => m.id !== movie.id);
      localStorage.setItem('movies', JSON.stringify(updatedMovies));
      movieSubmit.textContent = 'Add to my library';
      return;
    }
    const movieData = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      overview: movie.overview,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      popularity: movie.popularity,
      genres: movie.genres.map(genre => genre.name).join(','),
    };

    movies.push(movieData);
    localStorage.setItem('movies', JSON.stringify(movies));
    movieSubmit.textContent = 'Remove from my library';
  });
};
function getLocalStorage() {
  let movies;
  if (localStorage.getItem('movies') === null) {
    movies = [];
  } else {
    movies = JSON.parse(localStorage.getItem('movies'));
  }
  return movies;
}
export default modalUi;
