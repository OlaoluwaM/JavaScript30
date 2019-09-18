'use strict';
// Get all elements
const PLAYER = document.querySelector('.player');
const VIDEO = PLAYER.querySelector('.viewer');
const PROGRESS = PLAYER.querySelector('.progress');
const PROGRESS_BAR = PLAYER.querySelector('.progress__filled');
const TOGGLE = PLAYER.querySelector('.toggle');
const FULL_SCREEN = PLAYER.querySelector('.fullscreen');
const SKIP_BUTTONS = Array.from(PLAYER.querySelectorAll('[data-skip]'));
const RANGES = Array.from(PLAYER.querySelectorAll('.player__slider'));

// --------------------------------------------------------------

// Create Functions

// Toggle functionality
function togglePlay() {
  VIDEO[VIDEO.paused ? 'play' : 'pause']();
}
function updatePlayButton() {
  TOGGLE.textContent = this.paused ? '►' : '❚ ❚';
}
//---------------------------------------------------------------

// Skip functionality
function skip() {
  VIDEO.currentTime += Number(this.dataset.skip);
}
// --------------------------------------------------------------

// Volume bar functionality
let allowUpdate = false;
function handleRangeChange() {
  if (!allowUpdate) return;
  VIDEO[this.name] = parseFloat(this.value);
}
//---------------------------------------------------------------

// Progress bar functionality
function progressBarUpdate() {
  const percentage = (this.currentTime / this.duration) * 100;
  PROGRESS_BAR.style.flexBasis = `${percentage}%`;
}
let isTimeToUpdate = false;
function updateProgress(e) {
  if (!isTimeToUpdate) return;
  const scrubTime = (e.offsetX / PROGRESS.offsetWidth) * VIDEO.duration;
  VIDEO.currentTime = scrubTime;
}
//---------------------------------------------------------------

// Fullscreen functionality
function maybeSetToFullscreen(e) {
  VIDEO.requestFullscreen();
}
//---------------------------------------------------------------

//---------------------------------------------------------------

// Hook functions to fire on events
VIDEO.addEventListener('click', togglePlay);
VIDEO.addEventListener('play', updatePlayButton);
VIDEO.addEventListener('pause', updatePlayButton);
VIDEO.addEventListener('timeupdate', progressBarUpdate);

TOGGLE.addEventListener('click', togglePlay);

SKIP_BUTTONS.forEach((bttn) => bttn.addEventListener('click', skip));

RANGES.forEach((range) => {
  range.addEventListener('change', handleRangeChange);
  range.addEventListener('mousedown', () => {
    allowUpdate = true;
  });
  range.addEventListener('mousemove', handleRangeChange);
});

PROGRESS.addEventListener('click', updateProgress);
PROGRESS.addEventListener(
  'mousemove',
  (e) => isTimeToUpdate && updateProgress(e)
);
PROGRESS.addEventListener('mousedown', () => (isTimeToUpdate = true));
PROGRESS.addEventListener('mouseup', () => (isTimeToUpdate = false));

FULL_SCREEN.addEventListener('click', maybeSetToFullscreen);
PLAYER.addEventListener('fullscreenchange', (e) => console.log(e));
