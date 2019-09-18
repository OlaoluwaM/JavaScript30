'use strict';
const ENDPOINT = 'data.json';

const INPUT = document.querySelector('.search');
const SUGGESTION_CONTAINER = document.querySelector('.suggestions');

const CITIES = [];

fetch(ENDPOINT)
  .then((res) => res.json())
  .then((data) => {
    CITIES.push(...data);
  });

function findMatches(wordToMatch, cities = CITIES) {
  let regex = new RegExp(wordToMatch, 'gi');
  return cities.filter(
    (place) => place.city.match(regex) || place.state.match(regex)
  );
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const REGEX = new RegExp(this.value, 'gi');
  let matchArray = findMatches(this.value);
  const HTML = matchArray.map((place) => {
    const CITYNAME = place.city.replace(
      REGEX,
      `<span class="hl">${this.value.toLocaleLowerCase()}</span>`
    );
    const STATENAME = place.state.replace(
      REGEX,
      `<span class="hl">${this.value.toLocaleLowerCase()}</span>`
    );
    return `
        <li>
          <span class="name">${CITYNAME}, ${STATENAME}</span>
          <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `;
  });
  SUGGESTION_CONTAINER.innerHTML = HTML.join(' ');
}

INPUT.addEventListener('keyup', displayMatches);
INPUT.addEventListener('change', displayMatches);
