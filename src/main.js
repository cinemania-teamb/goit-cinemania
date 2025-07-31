import './js/header.js';
import axios from 'axios';
import modalUi from './js/modal.js';
import { fetchWeeklyFilms, fetchSearchFilms } from './js/catolog.js';

const form = document.getElementById('catolog-form');
const list = document.querySelector('.list');

const api_key = '4e64f2e0a197aa7c5d1170773553320c';

const defaultBlocks = async () => {
  try {
    const images = await fetchWeeklyFilms();
    const newImages = images
      .map(({ id, title, image, year, rating }) => {
        const date = year.split('-')[0];
        return image
          ? `<li id="${id}"  style="background-image: url(https://image.tmdb.org/t/p/w500/${image});background-size: cover;
    background-position: center;
    width: 395px;
    height: 574px;">
            <div class="info">
                <p>${title.toUpperCase()} | ${date}</p>
            </div>
        </li>`
          : '';
      })
      .join('');
    list.insertAdjacentHTML('beforeend', newImages);
    console.log(images);
  } catch (error) {
    console.log(error);
  }
};
defaultBlocks();

form.addEventListener('submit', async e => {
  e.preventDefault();
  list.innerHTML = '';

  const input = e.target.elements.input.value;
  const year = e.target.elements.choose.value;

  try {
    const images = await fetchSearchFilms(input, year);
    console.log(images);

    if (images.length === 0) {
      list.innerHTML = `<li class="not-found">OOPS... We are very sorry! We don’t have any results matching your search.</li>`;
      return;
    }
    const newImages = images
      .map(({ id, title, image, year, rating }) => {
        const date = year.split('-')[0];
        return image
          ? `<li id="${id}"  style="background-image: url(https://image.tmdb.org/t/p/w500/${image});background-size: cover;
    background-position: center;
    width: 395px;
    height: 574px;">
            <div class="info">
                <p>${title.toUpperCase()} | ${date}</p>
            </div>
        </li>`
          : '';
      })
      .join('');
    list.insertAdjacentHTML('beforeend', newImages);
  } catch (error) {
    console.log(error);
  }

  form.reset();
});
list.addEventListener('click', async e => {
  if (e.target.nodeName === 'LI') {
    const id = e.target.id;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
      );
      console.log(response.data);
      modalUi(response.data);
    } catch (error) {
      console.log(error);
    }
  }
});
