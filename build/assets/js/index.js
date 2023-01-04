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
window.addEventListener('load', () => {
  const $menu = document.querySelector('.menu');
  if ($menu) {
    const $menuToggle = $menu.querySelector('.menu__toggle');
    $menuToggle.addEventListener('click', () => {
      $menu.classList.toggle('menu--active');
      document.body.classList.toggle('body--lock');
    });

    $menu.addEventListener('click', e => {
      if ($menu === e.target && $menu.classList.contains('menu--active')) {
        $menu.classList.remove('menu--active');
        document.body.classList.remove('body--lock');
      }
    });
  }
});
window.addEventListener('load', () => {
  const $preloader = document.querySelector('.preloader');
  if ($preloader) {
    $preloader.classList.add('preloader--hide');
  }
});
const $steps = document.querySelectorAll('.steps');
if ($steps) {
  window.addEventListener('scroll', animateHandler);
  animateHandler();
}

function animateHandler() {
  const $stepItems = document.querySelectorAll('.steps__item');

  if (window.innerWidth <= 1200) {
    $stepItems.forEach(($step) => {
      const $stepImg = $step.querySelector('.step__img');
      const $stepInfo = $step.querySelector('.step__info');
      
      $stepImg.style.opacity = 1;
      $stepInfo.style.opacity = 1;
    });

    return;
  }

  $stepItems.forEach(($step, index) => {
    const scrollTop = window.scrollY;
    const scrollCenter = scrollTop + window.innerHeight / 2;

    const $stepInfo = $step.querySelector('.step__info');
    const stepBottom = $step.getBoundingClientRect().bottom;
    const stepScrollCenter = $step.offsetTop + $step.offsetHeight / 2;

    const $stepImg = $step.querySelector('.step__img');
    const imgTop = scrollTop + window.innerHeight / 2 - $stepImg.offsetHeight / 2;

    if (!$stepImg.classList.contains('step__img--fixed') && (imgTop > $step.offsetTop
      && stepBottom - window.innerHeight / 2 - $stepImg.offsetHeight / 2 > 0
    )) {
      $stepImg.classList.add('step__img--fixed');
      $stepImg.classList.remove('step__img--bottom');
    } else if ($stepImg.classList.contains('step__img--fixed') && (imgTop < $step.offsetTop)) {
      $stepImg.classList.remove('step__img--fixed', 'step__img--bottom');
    } else if ($stepImg.classList.contains('step__img--fixed') && stepBottom - window.innerHeight / 2 - $stepImg.offsetHeight / 2 < 0) {
      $stepImg.classList.remove('step__img--fixed');
      $stepImg.classList.add('step__img--bottom');
    } else if (!$stepImg.classList.contains('step__img--bottom') && stepBottom - window.innerHeight / 2 - $stepImg.offsetHeight / 2 < 0) {
      $stepImg.classList.add('step__img--bottom');
    }
    
    const opacityOffset = 200;
    let opacity;

    if (imgTop < $step.offsetTop) {
      opacity = 1;
    } else if ((stepBottom - window.innerHeight / 2 - $stepImg.offsetHeight / 2 < 0)) {
      opacity = 0;
    } else if (imgTop > $step.offsetTop && stepBottom - window.innerHeight / 2 - $stepImg.offsetHeight / 2 > 0) {
      if (scrollCenter < stepScrollCenter) {
        opacity = 1;
      } else if (scrollCenter > stepScrollCenter && scrollCenter - stepScrollCenter <= opacityOffset) {
        opacity = Math.abs(1 - (scrollCenter - stepScrollCenter) / opacityOffset)
      } else if (scrollCenter > stepScrollCenter && scrollCenter - stepScrollCenter > opacityOffset) {
        opacity = 0;
      }
    }

    if (index !== 0) {
      if (imgTop < $step.offsetTop) {
        opacity = 0;
      }
    }

    if (index === $stepItems.length - 1) {
      if (scrollCenter > stepScrollCenter && scrollCenter - stepScrollCenter <= opacityOffset) {
        opacity = 1;
      } else if (scrollCenter > stepScrollCenter && scrollCenter - stepScrollCenter > opacityOffset) {
        opacity = 1;
      }
    }

    $stepImg.style.opacity = opacity;
    $stepInfo.style.opacity = opacity;
  });
}
