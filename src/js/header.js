const $header = document.querySelector('.header');
if ($header) {
  scrollHandler();
  window.addEventListener('scroll', scrollHandler);
}

function scrollHandler() {
  if (window.innerWidth > 991) {
    return;
  }
  
  const scrollClass = 'header_active';
  if (window.pageYOffset >= 50 && !$header.classList.contains(scrollClass)) {
    $header.classList.add(scrollClass);
  } else if (window.pageYOffset < 50 && $header.classList.contains(scrollClass)) {
    $header.classList.remove(scrollClass);
  }
}