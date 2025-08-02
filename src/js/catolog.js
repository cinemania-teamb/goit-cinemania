// catalog weekly api
import axios from 'axios';

const api_key = '4e64f2e0a197aa7c5d1170773553320c';


const list = document.querySelector('.list');
const pagination = document.querySelector('.pagination ul');
let lastSearch = { input: '', year: '', isSearch: false };

const startEmpty = `<svg class="icon" id="stars-empty" width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`;
const startHalf = `<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`;
const startFull = `<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;

let currentPage = 1;
let totalPages = 1;

const genreIdsToStrings = async (genreIds) => {
    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/genre/movie/list?language=en',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWRkMzEzNDEyYzUzMjQyYTU2Nzc5ZjVjMWIwNWJlNSIsIm5iZiI6MTc1MzY5OTE4OS4xOTcsInN1YiI6IjY4ODc1Mzc1MGU0ODE4YTk5OTUyYjQ0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H565ZjOCGF6NhGwiaRj-BAZ12tadYHWeWDarSsxXtc4'
        }
    };
    try{
        const res = await axios.request(options);
        const genreIdList = res.data.genres;
        const genreString =genreIds.map( ids => genreIdList.find(genreItem => ids === genreItem.id)?.name || "undefined").join(" ");
        return genreString;
    }
    catch{
        return false;
    }
}

export const fetchWeeklyFilms = async (page = 1) => {
    const url=`https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}&language=en-US&page=${page}`;
    
    try{
      const res = await axios.get(url);
        const filteredData = await Promise.all( res.data.results.map(async filter=> ({
            title: filter.title || filter.name,
            rating: Math.round(filter.vote_average),
            genreId:await genreIdsToStrings(filter.genre_ids),
            year: filter.release_date || filter.first_air_date,
            id: filter.id,
            image: filter.poster_path
        })));
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
export const fetchSearchFilms = async (input, year = null,page) => {

    const filteredUrl = year !== null ? `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${input}&include_adult=false&language=en-US&page=${page}&primary_release_year=${year}` :
    `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${input}&include_adult=false&language=en-US&page=${page}`
    

    try{
      const res = await axios.get(filteredUrl);
        const filteredFilms = res.data.results.map(filter => ({
            title: filter.title || filter.name,
            rating: Math.round(filter.vote_average),
            genreId: filter.genre_ids,
            year: filter.release_date || filter.first_air_date,
            id: filter.id,
            image: filter.poster_path
        }));
        return {
          filteredFilms,
          total_pages: res.data.total_pages,
        };
    }
    catch(err){
        return err.data;
    }
        
}

export const  renderFilms =(images)=> {
  list.innerHTML = '';
  const newImages = images
    .map(({ id, title, image, year, rating, genreId }) => {
      const date = year.split('-')[0];
      const newRating = renderRating(rating);
      return image
        && `<li id="${id}" style="background-image: url(https://image.tmdb.org/t/p/w500/${image});background-size: cover;
      background-position: center;
      width: 395px;
      height: 574px;">
          <div class="info">
              <p>${title.toUpperCase()} <span style="color:#B7B7B7">${genreId} | ${date}</span></p>
              ${newRating}
          </div>
      </li>`
        ;
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
    return lastSearch;
  } catch (error) {
    console.log(error);
  }
}
export const renderRating = (rating) => { 
  let starts = '';
   switch (rating) {
     case 0:
       starts = `${startEmpty.repeat(5)}`;
       break;
     case 1:
       starts = `${startHalf}${startEmpty.repeat(4)}`;
       break;
     case 2:
       starts = `${startFull}${startEmpty.repeat(4)}`;
       break;
     case 3:
       starts = `${startFull}${startHalf}${startEmpty.repeat(3)}`;
       break;
     case 4:
       starts = `${startFull.repeat(2)}${startEmpty.repeat(3)}`;
       break;
     case 5:
       starts = `${startFull.repeat(2)}${startHalf}${startEmpty.repeat(2)}`;
       break;
     case 6:
       starts = `${startFull.repeat(3)}${startEmpty.repeat(2)}`;
       break;
     case 7:
       starts = `${startFull.repeat(3)}${startHalf}${startEmpty}`;
       break;
     case 8:
       starts = `${startFull.repeat(4)}${startEmpty}`;
       break;
     case 9:
       starts = `${startFull.repeat(4)}${startHalf}`;
       break;
     case 10:
       starts = `${startFull.repeat(5)}`;
       break;
     default:
       throw new Error('Invalid rating');
  }
  return `<div>${starts}</div>`;
}


