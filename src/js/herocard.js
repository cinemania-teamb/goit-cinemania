import modalUi from './modal.js';

const API_KEY = '4e64f2e0a197aa7c5d1170773553320c';

async function openHeroCard(movieId) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    const movie = await res.json();

    const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
    const creditsData = await creditsRes.json();

    const directorObj = creditsData.crew.find(p => p.job === 'Director');
    const director = directorObj ? directorObj.name : 'Unknown';

    movie.director = director;
    movie.release_year = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A';
    movie.runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';
    movie.language = movie.original_language.toUpperCase();

    modalUi(movie);



    // "Add to my library" butonunu kaldır 
setTimeout(() => {
  const addButton = document.querySelector('.movie-submit');
  if (addButton) addButton.remove();
}, 100);

//"Add to my library" butonu eklenmek istenirse setTimeout fonksiyonun eklenmesi yeterlidir.


    // Modal'ı ortalamak için CSS class ekle
    setTimeout(() => {
      const modal = document.querySelector('.basicLightbox__placeholder > *');
      if (modal) modal.classList.add('custom-herocard');
    }, 50);

    // Arka plana tıklayınca kapanması
    const backdrop = document.querySelector('.basicLightbox');
    backdrop.addEventListener('click', e => {
      if (e.target.classList.contains('basicLightbox')) {
        backdrop.remove();
      }
    });

  } catch (err) {
    console.error("Detaylar alınırken hata:", err);
    alert("Film detayları yüklenemedi.");
  }
}

export default openHeroCard;