const headerClassAndIdList = {
    menuToggleClass: '.menu-toggle',
    mobileMenuId: 'mobileMenu',
    mobileOverlayId: 'mobileOverlay',
}

const { menuToggleClass, mobileMenuId, mobileOverlayId } = headerClassAndIdList;

const menuToggle = document.querySelector(menuToggleClass);
const mobileMenu = document.getElementById(mobileMenuId);
const mobileOverlay = document.getElementById(mobileOverlayId);

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('active');
});


// Tema geçişi: light <-> dark
const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

themeSwitcher.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
});


// Menü dışına tıklanınca kapat (isteğe bağlı)
document.addEventListener('click', (e) => {
    const isClickInsideMenu = mobileMenu.contains(e.target);
    const isClickOnButton = menuToggle.contains(e.target);

    if (!isClickInsideMenu && !isClickOnButton) {
        mobileMenu.classList.remove('open');
        mobileOverlay.classList.remove('active');
    }
});