// API Yapılandırması
import axios from "axios";
import modalUi from './modal.js';
const API_KEY = "31537460e1a179eb456191c366c87865";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/";



// DOM elements
const weeklyTrendsContainer = document.getElementById('weekly-trends');
// Yıldız ikonları
const startEmpty = `<svg class="icon" width="18" height="18">
          <use href="./icons.svg#icon-star-outline"></use>
        </svg>`;
const startHalf = `<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star-half"></use>
        </svg>`;
const startFull = `<svg class="icon" fill="#F87719" width="18" height="18">
          <use href="./icons.svg#icon-star"></use>
        </svg>`;

// Rating yıldızlarını oluşturma fonksiyonu
function renderRatingStars(voteAverage) {
  // 10 üzerinden olan puanı 5 üzerine dönüştür
  const normalizedRating = voteAverage / 2;
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;
  
  let starsHTML = '';
  
  // Tam yıldızlar
  starsHTML += startFull.repeat(fullStars);
  
  // Yarım yıldız
  if (hasHalfStar) {
    starsHTML += startHalf;
  }
  
  // Boş yıldızlar
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  starsHTML += startEmpty.repeat(emptyStars);
  
  return `<div class="movie-rating">${starsHTML}</div>`;
}

// Haftalık trend filmleri getirme fonksiyonu
async function fetchWeeklyTrends() {
  try {
    // Filmleri ve tür listesini paralel olarak al
    const [moviesResponse, genresResponse] = await Promise.all([
      axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`),
      axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    ]);
    
    const genresMap = new Map(genresResponse.data.genres.map(genre => [genre.id, genre.name]));
    displayWeeklyTrends(moviesResponse.data.results.slice(0, 3), genresMap);
  } catch (error) {
    console.error('Veri alınırken hata:', error);
    weeklyTrendsContainer.innerHTML = '<p>Filmler yüklenirken hata oluştu. Lütfen tekrar deneyin.</p>';
  }
}
// Haftalık trend filmlerini ekranda gösterme fonksiyonu
function displayWeeklyTrends(movies, genresMap) {
  weeklyTrendsContainer.innerHTML = movies.map(movie => {
    // Film türlerini al (ilk 2 türü kullan)
    const movieGenres = movie.genre_ids
      .map(id => genresMap.get(id))
      .filter(Boolean)
      .slice(0, 2)
      .join(', ');
    
    // Tarih bilgisi (sadece yıl)
    const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : 'Tarih Yok';
    
    // Tür ve tarih bilgisini birleştir
    const genreAndDate = movieGenres ? `${movieGenres} || ${releaseYear}` : releaseYear;
    //rating
    const ratingStars = renderRatingStars(movie.vote_average);
    return `
    <div class="movie-card" data-id="${movie.id}">
      <img class="movie-poster" 
           src="${movie.poster_path ? IMG_BASE_URL + 'w500' + movie.poster_path : 'https://via.placeholder.com/300x450?text=Poster+Yok'}" 
           alt="${movie.title}"
           onerror="this.src='https://via.placeholder.com/300x450?text=Poster+Hatası'">
      <div class="movie-info">
       <div class="title-date">
       <h3 class="movie-title">${movie.title}</h3>
       <p class="movie-date">${genreAndDate}</p>
       </div>
       ${ratingStars}
      </div>
    </div>
    `;
  }).join('');
}
// Sayfa yüklendiğinde trend filmleri getir
document.addEventListener('DOMContentLoaded', fetchWeeklyTrends);

const movieList= document.querySelector(".movie-grid");
movieList.addEventListener('click', async e => {
  if (e.target.nodeName === 'IMG') {
    const id =e.target.parentElement.dataset.id;
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${Number(id)}?api_key=${API_KEY}&language=en-US`
      );
      modalUi(response.data);
    } catch (error) {
      console.log(error);
    }
  }   
});