// catalog weekly api
import axios from 'axios';

const api_key = '4e64f2e0a197aa7c5d1170773553320c';


const list = document.querySelector('.list');
const pagination = document.querySelector('.pagination ul');
let lastSearch = { input: '', year: '', isSearch: false };

let currentPage = 1;
let totalPages = 1;

export const fetchWeeklyFilms = async (page = 1) => {
    const url=`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}&language=en-US&page=${page}`;
    
    try{
        const res = await axios.get(url);
        console.log(res.data);
        const filteredData = res.data.results.map( filter=> ({
            title: filter.title || filter.name,
            rating: filter.vote_average,
            genreId: filter.genre_ids,
            year: filter.release_date || filter.first_air_date,
            id: filter.id,
            image: filter.poster_path
        }));
        return {
            filteredData,
            total_pages: res.data.total_pages
        };
    }
    catch(err){
        return false;
    }
}

//filtered by name and year or both
export const fetchSearchFilms = async (input, year = null,page = 1) => {

    const filteredUrl = year !== null ? `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${input}&include_adult=false&language=en-US&page=${page}&primary_release_year=${year}` :
    `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${input}&include_adult=false&language=en-US&page=${page}`
    

    try{
        const res = await axios.get(filteredUrl);
        const filteredFilms = res.data.results.map(filter => ({
            title: filter.title || filter.name,
            rating: filter.vote_average,
            genreId: filter.genre_ids,
            year: filter.release_date || filter.first_air_date,
            id: filter.id,
            image: filter.poster_path
        }));
        return {
            filteredFilms,
            total_pages: res.data.total_pages
        };
    }
    catch(err){
        return err.data;
    }
        
}

export const  renderFilms =(images)=> {
  list.innerHTML = '';
  const newImages = images
    .map(({ id, title, image, year }) => {
      const date = year.split('-')[0];
      return image
        ? `<li id="${id}" style="background-image: url(https://image.tmdb.org/t/p/w500/${image});background-size: cover;
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
}
export const  renderPagination =(total, current) =>{
  pagination.innerHTML = '';
  let html = '';

  // Previous button
  if (current > 1) {
    html += `<li data-page="${current - 1}" class="prev"><</li>`;
  }

  // Page numbers (show max 5 pages around current)
  let start = Math.max(1, current - 2);
  let end = Math.min(total, current + 2);
  for (let i = start; i <= end; i++) {
    html += `<li data-page="${i}" class="${
      i === current ? 'active' : ''
    }">${i}</li>`;
  }

  // Next button
  if (current < total) {
    html += `<li data-page="${current + 1}" class="next">></li>`;
  }

  pagination.innerHTML = html;
}
export const loadWeeklyFilms = async (page = 1) => {
  try {
    const { filteredData, total_pages } = await fetchWeeklyFilms(page);
    totalPages = total_pages;
    currentPage = page;
    renderFilms(filteredData);
    renderPagination(totalPages, currentPage);
    lastSearch = { input: '', year: '', isSearch: false };
  } catch (error) {
    console.log(error);
  }
}
export const loadSearchFilms = async (input, year, page = 1)=> {
  try {
    const { filteredFilms, total_pages } = await fetchSearchFilms(
      input,
      year,
      page
    );
    totalPages = total_pages;
    currentPage = page;
    if (filteredFilms.length === 0) {
      list.innerHTML = `<li class="not-found">OOPS... We are very sorry! We don’t have any results matching your search.</li>`;
      pagination.innerHTML = '';
      return;
    }
    renderFilms(filteredFilms);
    renderPagination(totalPages, currentPage);
    lastSearch = { input, year, isSearch: true };
  } catch (error) {
    console.log(error);
  }
}