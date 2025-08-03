import axios from 'axios';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { renderRating } from './catolog.js';
import modalUi from './modal.js';

const api_key = '4e64f2e0a197aa7c5d1170773553320c';

const heroList = document.querySelector('.hero-section');

const loadTrendingMovies = async () => {
  try {
    const images = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`
    );
    const { results } = images.data;

    if (results.length === 0) {
      heroList.style.backgroundImage = 'url(../img/noresult.jpg)';
      heroList.innerHTML = `
      <div class="container position-container">
        <h1>Let’s Make Your Own Cinema</h1>
        <p>Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
        <a href="./catolog.html" class="link-trailer">Get Started</a>
      `;
    } else {
      const random = Math.floor(Math.random() * results.length);

      const randomMovie = results[random];

      heroList.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path})`;

      heroList.innerHTML = `
      <div class="container position-container">
        <h1>${randomMovie.title}</h1>
        <div>
          ${renderRating(Math.round(randomMovie.vote_average))}
        </div>
        <p>${randomMovie.overview}</p>
        <button data-id=${randomMovie.id} class="trailer">Watch trailer</button>
        <button data-id=${
          randomMovie.id
        } id="details" class="details">More details</button>
      </div>
    `;
      const detailsButton = document.getElementById('details');
      detailsButton.addEventListener('click', async e => {
        if (e.target.nodeName === 'BUTTON') {
          const id = e.target.dataset.id;
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
      const trailerButton = document.querySelector('.trailer');
      trailerButton.addEventListener('click', async e => {
        const id = trailerButton.dataset.id;
        if (e.target.nodeName === 'BUTTON') {
          try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`
            );
            const videos = response.data.results;

            const trailer = videos.find(
              video => video.type === 'Trailer' && video.site === 'YouTube'
            );
            if (trailer) {
              const instance = basicLightbox.create(`
              <div class="modal-trailer" style="width:700px; height: 400px;">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>
                <p class="close">&#10006;</p>
              </div>
               
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
            } else {
              const instance = basicLightbox.create(`
              <div class="no-trailer">
                
                <p>OOPS... We are very sorry! But we couldn’t find the trailer.</p>
                <img src="../img/sorry.jpg" width="363" height="318" alt="Sorry image">
                <p class="close">&#10006;</p>
              </div>
              
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
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

loadTrendingMovies();
