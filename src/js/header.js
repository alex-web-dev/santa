const $header = document.querySelector('.header');
if ($header) {
  scrollHandler();
  window.addEventListener('scroll', scrollHandler);
}

function scrollHandler() {
  const scrollClass = 'header--active';

  if (window.innerWidth > 991) {
    $header.classList.remove(scrollClass);
    return;
  }
  
  if (window.pageYOffset >= 50 && !$header.classList.contains(scrollClass)) {
    $header.classList.add(scrollClass);
  } else if (window.pageYOffset < 15 && $header.classList.contains(scrollClass)) {
    $header.classList.remove(scrollClass);
  }
}