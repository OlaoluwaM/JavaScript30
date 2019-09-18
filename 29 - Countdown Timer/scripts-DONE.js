'use strict';

let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const timerButtons = Array.from(document.querySelectorAll('.timer__button'));
const form = document.getElementById('custom');
const input = form.querySelector('input[name="minutes"]');

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // stop if less than zero
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${format(minutes)}:${format(remainderSeconds)}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(endTime) {
  const display = new Date(endTime).toLocaleTimeString('en-US', {
    timeStyle: 'short'
  });
  endTimeDisplay.textContent = `Be back at ${display}`;
}

function format(number) {
  return number.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
}

timerButtons.forEach((bttn) =>
  bttn.addEventListener('click', () => timer(parseFloat(bttn.dataset.time)))
);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  timer(input.value * 60);
  e.target.reset();
});
