setTimeout(() => {
  const $loadingCards = document.querySelectorAll('.start-card--loading');
  $loadingCards.forEach($card => $card.classList.remove('start-card--loading'));
}, 1000)