document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const themeSwitcher = document.getElementById('theme-switcher');

  if (!menuToggle || !mobileMenu || !mobileOverlay || !themeSwitcher) {
    console.error('Elementler bulunamadı');
    return;
  }

  const toggleMenu = () => {
    mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    menuToggle.setAttribute(
      'aria-expanded',
      mobileMenu.classList.contains('open')
    );
  };

  menuToggle.addEventListener('click', e => {
    e.stopPropagation();
    toggleMenu();
  });

  mobileOverlay.addEventListener('click', toggleMenu);

  themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem(
      'theme',
      document.body.classList.contains('dark-theme') ? 'dark' : 'light'
    );
  });

  // Sayfa yüklendiğinde kaydedilmiş tema uygula
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggleMenu();
    }
  });
});
