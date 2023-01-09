const $reviews = document.querySelector('.reviews');
if ($reviews) {
  const $moreBtn = $reviews.querySelector('.reviews__more');
  const $moreList = $reviews.querySelector('.reviews__list--more');

  $moreBtn?.addEventListener('click', () => {
    $moreList.classList.add('reviews__list--active');
    $moreBtn.classList.add('reviews__more--hide');
  });
}