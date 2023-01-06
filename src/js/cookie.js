const $cookieAlert = document.querySelector('.message-alert--cookie');
if ($cookieAlert) {
  const isAccept = JSON.parse(localStorage.getItem('cookie'));
  if (!isAccept) {
    setTimeout(() => $cookieAlert.classList.add('message-alert--show'), 500);
  }
  
  const $acceptBtn = $cookieAlert.querySelector('.message-alert__btn');
  $acceptBtn.addEventListener('click', accept);
}

function accept() {
  localStorage.setItem('cookie', JSON.stringify(true));
  $cookieAlert.classList.remove('message-alert--show');
}