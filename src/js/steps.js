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
