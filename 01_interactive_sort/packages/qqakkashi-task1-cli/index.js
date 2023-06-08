#! /usr/bin/env node

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
    if (stdin === "exit") {
      readline.close();
    } else {
      const inputData = stdin.split(" ");
      readline.question(enterCommandQuestion, (stdin) => {
        start();
      });
    }
  });
};
start();
