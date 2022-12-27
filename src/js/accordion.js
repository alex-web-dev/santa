const $accordions = document.querySelectorAll('.accordion');
$accordions.forEach($accordion => {
  const $btn = $accordion.querySelector('.accordion__btn');
  const $content = $accordion.querySelector('.accordion__content');

  $btn.addEventListener('click', () => {
    const $openingAccordions = document.querySelectorAll('.accordion--opening');
    if ($accordion.hasAttribute('data-only-one') && $openingAccordions.length) {
      $openingAccordions.forEach($openingAccordion => {
        const $activatingContent = $openingAccordion.querySelector('.accordion__content');
        $activatingContent.addEventListener('transitionend', () => {
          hide($openingAccordion);
        }, { once: true });
      });
    }

    const $activeAccordions = document.querySelectorAll('.accordion--active');
    if ($accordion.hasAttribute('data-only-one') && $activeAccordions.length) {
      $activeAccordions.forEach($activeAccordion => hide($activeAccordion));
    }

    $accordion.classList.contains('accordion--active') ? hide($accordion) : show($accordion);
  });

  $content.addEventListener('transitionend', () => {
    $accordion.classList.remove('accordion--activating', 'accordion--closing', 'accordion--opening');

    if (!$accordion.classList.contains('accordion--active')) {
      $content.setAttribute('style', '');
      $accordion.classList.add('accordion--active');
    } else {
      $accordion.classList.remove('accordion--active');
    }
  });
});

function hide($accordion) {
  const $btn = $accordion.querySelector('.accordion__btn');
  const $content = $accordion.querySelector('.accordion__content');

  $btn.classList.remove('accordion__btn--active');
  $content.style.height = `${$content.scrollHeight}px`;
  $accordion.classList.add('accordion--activating', 'accordion--closing');
  setTimeout(() => $content.style.height = '0px');
}

function show($accordion) {
  const $btn = $accordion.querySelector('.accordion__btn');
  const $content = $accordion.querySelector('.accordion__content');

  $btn.classList.add('accordion__btn--active');
  $accordion.classList.add('accordion--activating', 'accordion--opening');
  $content.style.height = `${$content.scrollHeight}px`;
}