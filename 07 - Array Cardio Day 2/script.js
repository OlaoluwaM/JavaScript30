'use strict'

// ## Array Cardio Day 2

const people = [{
    name: 'Wes',
    year: 1988
  },
  {
    name: 'Kait',
    year: 1986
  },
  {
    name: 'Irv',
    year: 1970
  },
  {
    name: 'Lux',
    year: 2015
  }
];

const comments = [{
    text: 'Love this!',
    id: 523423
  },
  {
    text: 'Super good',
    id: 823423
  },
  {
    text: 'You are the best',
    id: 2039842
  },
  {
    text: 'Ramen is my fav food ever',
    id: 123523
  },
  {
    text: 'Nice Nice Nice!',
    id: 542328
  }
];

let currentYear = new Date().getFullYear();
// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
let anyAdults = people.some(ppl => (currentYear - ppl.year) >= 19);
console.log({
  anyAdults
})

// Array.prototype.every() // is everyone 19 or older?
let isEveryoneAnAdult = people.every(ppl => (currentYear - ppl.year) >= 19);
console.log({
  isEveryoneAnAdult
})

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423

let wantedComment = comments.find(obj => obj.id === 823423);
console.log(wantedComment)

// Array.prototype.findIndex()
// Find the comment with this ID
let wantedCommentIndex = comments.findIndex(obj => obj.id === 823423)
console.log(wantedCommentIndex);

// delete the comment with the ID of 823423
let newCommentsArray = comments.splice(wantedCommentIndex, 1);
console.log(comments)
