function onLoad() {
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      document.querySelector('body').style.visibility = 'visible';
      const loaderEl = document.querySelector('#loader');
      if (loaderEl) loaderEl.classList.remove('show-loader');
    } else {
      setTimeout(function () {
        document.querySelector('body').style.visibility = 'visible';
        const loaderEl = document.querySelector('#loader');
        if (loaderEl) loaderEl.classList.remove('show-loader');
      }, 3000);
    }
  };
}
onLoad();
export function showLoader() {
  const loaderEl = document.querySelector('#loader');
  if (loaderEl) loaderEl.classList.add('show-loader');
}
export function hideLoader() {
  const loaderEl = document.querySelector('#loader');
  if (loaderEl) loaderEl.classList.remove('show-loader');
}
