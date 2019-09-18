'use strict';

const INPUTS = Array.from(document.querySelectorAll('input'));

// MY old implementation
// const SHIFT_KEY = 16;

// document.querySelector('.inbox').addEventListener('change', setPoints);

// function setPoints() {
//   if (event.target.matches('input') && event.target.checked === true) {
//     if (event.currentTarget !== document.body) {
//       console.log(event);
//       INPUTS.forEach((inp) => inp.removeAttribute('data-point'));
//       event.target.setAttribute('data-point', '1');
//       return;
//     } else {
//       event.target.setAttribute('data-point', '2');
//       document.body.removeEventListener('change', setPoints);
//       document.querySelector('.inbox').addEventListener('change', setPoints);
//       return;
//     }
//   }
// }

// document.body.addEventListener('keydown', (e) => {
//   document.querySelector('.inbox').removeEventListener('change', setPoints);
//   if (e.keyCode !== SHIFT_KEY) return;
//   document.body.addEventListener('change', () => setPoints(2), {
//     once: true
//   });
// });

// document.body.addEventListener('keyup', (e) => {
//   if (e.keyCode !== SHIFT_KEY) return;
//
// });

// My new Implementation

function checkInBetweeen() {
  INPUTS.forEach((checkbox, ind, array) => {
    let point1 = array.indexOf(document.querySelector('[data-point="1"]')),
      point2 = array.indexOf(document.querySelector('[data-point="2"]'));
    if (point1 === -1) point1 = array.length;
    let larger = point2 > point1 ? point2 : point1,
      smaller = point2 > point1 ? point1 : point2;
    array.slice(smaller, larger).forEach((input) => (input.checked = true));
  });
}
function handleCheck(e) {
  if (this.checked && !e.shiftKey) {
    INPUTS.forEach((inp) => inp.removeAttribute('data-point'));
    this.setAttribute('data-point', '1');
  }
  if (this.checked && e.shiftKey) this.setAttribute('data-point', '2');
  if (document.contains(document.querySelector('input[data-point="2"]')))
    checkInBetweeen();
}
INPUTS.forEach((elem) => elem.addEventListener('click', handleCheck));
