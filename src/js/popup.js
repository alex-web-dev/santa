const $openBtns = document.querySelectorAll('.js-open-popup');
$openBtns.forEach($btn => {
  $btn.addEventListener('click', () => {
    const name = $btn.dataset.popupName;
    const $popup = document.querySelector(`.popup[data-name="${name}"`);
    if (!name || !$popup) {
      return;
    }

    $popup.classList.add('popup--show');
  });
});

const $popups = document.querySelectorAll('.popup');
$popups.forEach($popup => {
  const $closeBtn = $popup.querySelector('.popup__close');
  $closeBtn.addEventListener('click', () => {
    $popup.classList.remove('popup--show');
  });

  $popup.addEventListener('click', (e) => {
    if ($popup === e.target) {
      $popup.classList.remove('popup--show');
    }
  });
});