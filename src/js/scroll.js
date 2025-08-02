// DOM TAM YÜKLENDİĞİNDE ÇALIŞTIR
    document.addEventListener('DOMContentLoaded', () => {
      const btn = document.getElementById('scrollToTopBtn');
      
      // Scroll event dinleyicisi
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      });
      
      // Tıklama eventi
      btn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });