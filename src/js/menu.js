window.addEventListener('load', () => {
  const $menu = document.querySelector('.menu');
  if ($menu) {
    const $menuToggle = $menu.querySelector('.menu__toggle');
    $menuToggle.addEventListener('click', () => {
      $menu.classList.toggle('menu_active');
    });

    $menu.addEventListener('click', e => {
      if ($menu === e.target && $menu.classList.contains('menu_active')) {
        $menu.classList.remove('menu_active');
      }
    });
  }
});