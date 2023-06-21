window.addEventListener('load', () => {
  const $preloader = document.querySelector('.preloader');
  if ($preloader && $preloader.dataset.alwaysShow != '') {
    $preloader.classList.add('preloader--hide');
  }
});