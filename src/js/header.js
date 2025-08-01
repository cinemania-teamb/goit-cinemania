// 1. Sayfa yüklendiğinde localStorage'dan tema tercihini uygula
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
});

// 2. Gerekli class ve ID'leri tanımla
const headerClassAndIdList = {
  menuToggleClass: '.menu-toggle',
  mobileMenuId: 'mobileMenu',
  mobileOverlayId: 'mobileOverlay',
};

const { menuToggleClass, mobileMenuId, mobileOverlayId } = headerClassAndIdList;

const menuToggle = document.querySelector(menuToggleClass);
const mobileMenu = document.getElementById(mobileMenuId);
const mobileOverlay = document.getElementById(mobileOverlayId);

// 3. Menü toggle butonuna tıklanınca mobil menüyü aç/kapat
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  mobileOverlay.classList.toggle('active');
});

// 4. Tema geçiş butonu işlemleri
const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

themeSwitcher.addEventListener('click', () => {
  body.classList.toggle('dark-theme');

  const isDark = body.classList.contains('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// 5. Menü dışına tıklanırsa menüyü kapat
document.addEventListener('click', (e) => {
  const isClickInsideMenu = mobileMenu.contains(e.target);
  const isClickOnButton = menuToggle.contains(e.target);

  if (!isClickInsideMenu && !isClickOnButton) {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('active');
  }
});
