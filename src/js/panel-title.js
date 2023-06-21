setTimeout(() => {
  const $loadingTitles = document.querySelectorAll('.panel-title4--loading');
  $loadingTitles.forEach($title => $title.classList.remove('panel-title4--loading'));
}, 1000)