const inquirer = require("inquirer");
const Database = require("./src/database");

const db = new Database("./src/content/db.txt");

async function start() {
  //prompt for username
  const userNameInputPrompt = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the user's name. To cancel press ENTER: ",
    },
  ]);

  //if user press ENTER start findUserPrompt
  if (!userNameInputPrompt.name) {
    const findUserPrompt = await inquirer.prompt([
      {
        type: "confirm",
        name: "find",
        message: "Would you to search values in DB? ",
      },
    ]);

    db.showDatabase();

    if (!findUserPrompt.find) {
      console.log("\nGoodbye!\n");
      return;
    }

    const userUsernameToFind = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter user's name you wanna find in DB? ",
      },
    ]);

    const foundedUser = db.findUser(userUsernameToFind.name);
    console.log(foundedUser);

    return;
  }

  const userGenderAndAgeInput = await inquirer.prompt([
    {
      type: "list",
      name: "gender",
      message: "Choose the Gender.",
      choices: ["male", "female"],
    },
    {
      type: "number",
      name: "age",
      message: "Enter your age: ",
    },
  ]);

  db.updateDatabase({ ...userNameInputPrompt, ...userGenderAndAgeInput });

  start();
}

start();
