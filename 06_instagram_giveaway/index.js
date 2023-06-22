const fs = require("fs");

let allUsernames = [];

for (let i = 0; i < 20; i++) {
  allUsernames = [
    ...allUsernames,
    ...fs.readFileSync(`./2kk_words_400x400/out${i}.txt`, "utf8").split("\n"),
  ];
}

let countUsernamesOccursInFiles = {};

allUsernames.forEach((username) => {
  if (countUsernamesOccursInFiles[username]) {
    countUsernamesOccursInFiles[username]++;
  } else {
    countUsernamesOccursInFiles[username] = 1;
  }
});

const uniqueValues = () => {
  return [...new Set(allUsernames)].length;
};

const existInAllFiles = () => {
  return Object.keys(countUsernamesOccursInFiles).filter(
    (username) => countUsernamesOccursInFiles[username] === 20
  ).length;
};

const existInAtleastTen = () => {
  return Object.keys(countUsernamesOccursInFiles).filter(
    (username) => countUsernamesOccursInFiles[username] >= 10
  ).length;
};

console.time("elapsed time");
console.log(uniqueValues());
console.log(existInAllFiles());
console.log(existInAtleastTen());
console.timeEnd("elapsed time");
