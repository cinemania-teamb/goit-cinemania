import modalUi from './modal.js';
import openHeroCard from './herocard.js';


const API_KEY = '4e64f2e0a197aa7c5d1170773553320c';

const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const detailsModal = document.getElementById('details-modal');
const trailerModal = document.getElementById('trailer-modal');
const detailsContainer = document.getElementById('details-container');
const trailerContainer = document.getElementById('trailer-container');
const closeDetails = document.getElementById('close-details');
const closeTrailer = document.getElementById('close-trailer');

async function loadTrendingMovies() {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      showDefaultSlide();
      return;
    }

    // Her film için bir slayt oluştur
    data.results.forEach(film => {
      const slide = document.createElement('div');
      slide.className = 'hero-slide';
      slide.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${film.backdrop_path})`;



      slide.innerHTML = `
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>${film.title}</h1>
          <p>${film.overview.slice(0, 200)}...</p>
          <p>IMDb: ${film.vote_average}</p>
          <button onclick='openDetailsModal(${JSON.stringify(film).replace(/'/g, "\\'")})'>More Details</button>
          <button onclick='openTrailerModal(${film.id})'>Watch Trailer</button>
        </div>
      `;

      

      carousel.appendChild(slide);
    });

  } catch (err) {
    console.error('Hata:', err);
    showDefaultSlide();
  }
}








function showDefaultSlide() {
  const slide = document.createElement('div');
  slide.className = 'hero-slide';
  slide.style.backgroundImage = `url('default-hero.jpg')`;
  slide.innerHTML = `
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1>Welcome to Cinemania</h1>
      <p>Explore timeless stories and epic moments from world cinema.</p>
      <button onclick="window.location.href='catalog.html'">Get Started</button>
    </div>
  `;
  carousel.appendChild(slide);
}

// Butonlarla kaydırma
prevBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
});



// Modallar
function openDetailsModal(film) {
  openHeroCard(film.id);
}





async function openTrailerModal(filmId) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${filmId}/videos?api_key=${API_KEY}&language=en-US`);
    const data = await res.json();

    const trailer = data.results.find(v => v.type === "Trailer" && v.site === "YouTube");

    if (!trailer) {
      trailerContainer.innerHTML = `<p>Sorry, no trailer available.</p>`;
    } else {
      trailerContainer.innerHTML = `
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>
      `;
    }

    trailerModal.classList.remove('hidden');
  } catch (err) {
    trailerContainer.innerHTML = `<p>Error loading trailer.</p>`;
    trailerModal.classList.remove('hidden');
  }
}

// Modal kapama
closeDetails.onclick = () => detailsModal.classList.add('hidden');
closeTrailer.onclick = () => trailerModal.classList.add('hidden');

// Sayfa yüklenince başla
document.addEventListener('DOMContentLoaded', loadTrendingMovies);

window.openDetailsModal = openDetailsModal;
window.openTrailerModal= openTrailerModal;

