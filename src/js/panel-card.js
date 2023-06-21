const $panelCards = document.querySelectorAll('.panel-card');
$panelCards.forEach($card => {
  const $showBtn = document.querySelector('.panel-card__show');
  $showBtn?.addEventListener('click', () => $card.classList.remove('panel-card--hidden'));
});

setTimeout(() => {
  const $loadingCards = document.querySelectorAll('.panel-card--loading');
  $loadingCards.forEach($card => $card.classList.remove('panel-card--loading'));
}, 1000)