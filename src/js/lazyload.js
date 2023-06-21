import LazyLoad from "vanilla-lazyload";

window.addEventListener('load', () => {
  new LazyLoad({
    threshold: 300
  });
});