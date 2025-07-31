// API Yapılandırması
    const API_KEY = "31537460e1a179eb456191c366c87865";
    const BASE_URL = "https://api.themoviedb.org/3";
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/";
//DOM elements
 const weeklyTrendsContainer = document.getElementById('weekly-trends');   
    // Uygulamayı başlatın
    document.addEventListener('DOMContentLoaded', () => {
      fetchGenres();
      fetchWeeklyTrends();
    });
       
// Haftalık trend filmleri getirme fonksiyonu
async function fetchWeeklyTrends() {
  try {
    // TMDB API'sinden haftalık trend filmleri al
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await response.json();
    
    // İlk 3 filmi al ve ekranda göster
    displayWeeklyTrends(data.results.slice(0, 3));
  } catch (error) {
    console.error('Haftalık trendler alınırken hata:', error);
    weeklyTrendsContainer.innerHTML = '<p>Trend filmler yüklenirken hata oluştu. Lütfen tekrar deneyin.</p>';
  }
}

// Haftalık trend filmlerini ekranda gösterme fonksiyonu
function displayWeeklyTrends(movies) {
  // Film kartlarını oluştur
  weeklyTrendsContainer.innerHTML = movies.map(movie => `
    <div class="movie-card" data-id="${movie.id}">
      <img class="movie-poster" 
           src="${movie.poster_path ? IMG_BASE_URL + 'w500' + movie.poster_path : 'https://via.placeholder.com/300x450?text=Poster+Yok'}" 
           alt="${movie.title}"
           onerror="this.src='https://via.placeholder.com/300x450?text=Poster+Hatası'">
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-date">${movie.release_date ? movie.release_date.substring(0, 4) : 'Tarih Yok'}</p>
      </div>
    </div>
  `).join('');
  
};