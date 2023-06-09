#! /usr/bin/env node

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const wordsByNameSort = require("./src/words-by-name-sort");
const fromSmallest = require("./src/from-smallest");
const fromBiggest = require("./src/from-biggest");

const enterQuestion = `Hello. Enter 10 words or digits dividing them in spaces: `;

const enterCommandQuestion = `How would you like to sort values:
1. Words by name (from A to Z)
2. Show digits from smallest.
3. Show digits from biggest.
4. Words by quantity of letters.
5. Only unique words.
  
Select (1 - 5) and press ENTER: `;

const start = () => {
  readline.question(enterQuestion, (stdin) => {
    const inputData = stdin.split(" ");
    readline.question(enterCommandQuestion, (stdin) => {
      switch (stdin) {
        case "1":
          const sordtedArrayWordsByName = wordsByNameSort(inputData);
          console.log(sordtedArrayWordsByName);
          break;
        case "2":
          const sordtedArrayFromSmallest = fromSmallest(inputData);
          console.log(sordtedArrayFromSmallest);
          break;
        case "3":
          const sordtedArrayFromBiggest = fromBiggest(inputData);
          console.log(sordtedArrayFromBiggest);
          break;
        case "exit":
          console.log("\nGood bye! Come back later!\n");
          readline.close();
          return;
        default:
          console.log("\nYou entrerd wrond sort type!\n");
          break;
      }
      start();
    });
  });
};

start();
