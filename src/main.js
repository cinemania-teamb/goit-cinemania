import './js/header.js';
import axios from 'axios';
import modalUi from './js/modal.js';
import {
  fetchWeeklyFilms,
  fetchSearchFilms,
  renderFilms,
  renderPagination,
  loadWeeklyFilms,
  loadSearchFilms,
} from './js/catolog.js';

const form = document.getElementById('catolog-form');
const list = document.querySelector('.list');
const pagination = document.querySelector('.pagination ul');

const api_key = '4e64f2e0a197aa7c5d1170773553320c';


let lastSearch = { input: '', year: '', isSearch: false };

form.addEventListener('submit', async e => {
  e.preventDefault();
  const input = e.target.elements.input.value;
  const year = e.target.elements.choose.value;
  if (input === "") {
    list.innerHTML = `<li class="not-found">Please enter a search term.</li>`;
    pagination.innerHTML = '';
    lastSearch = { input: '', year: '', isSearch: false };
    return;
  }
  const newLastSearch = await loadSearchFilms(input, year, 1);
  lastSearch.isSearch = newLastSearch.isSearch;
  lastSearch.input = newLastSearch.input;
  lastSearch.year = newLastSearch.year;
  form.reset();
});

pagination.addEventListener('click', async e => {
  if (e.target.tagName === 'LI' && e.target.dataset.page) {
    const page = Number(e.target.dataset.page);
    if (lastSearch.isSearch) {
      
      await loadSearchFilms(lastSearch.input, lastSearch.year, page);
    } else {
      await loadWeeklyFilms(page);
    }
  }
});

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

// Initial load
loadWeeklyFilms();
