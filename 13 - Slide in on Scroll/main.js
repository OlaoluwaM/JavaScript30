'use strict';
const SLIDER_IMAGES = Array.from(document.querySelectorAll('.slide-in'));

const debounce = (func, ms = 0) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), ms);
  };
};

function slideIn() {
  SLIDER_IMAGES.forEach((img) => {
    const DISTANCE_FROM_PAGE_BOTTOM = window.scrollY + window.innerHeight,
      SLIDE_IN_AT = DISTANCE_FROM_PAGE_BOTTOM - img.height / 2,
      IMAGE_BOTTOM = img.offsetTop + img.height,
      IS_HALF_SHOWN = SLIDE_IN_AT > img.offsetTop,
      NOT_SCROLLED_PASSED = window.scrollY <= IMAGE_BOTTOM;
    if (IS_HALF_SHOWN && NOT_SCROLLED_PASSED) img.classList.add('active');
    else img.classList.remove('active');
  });
}

window.addEventListener('scroll', debounce(slideIn, 500));
