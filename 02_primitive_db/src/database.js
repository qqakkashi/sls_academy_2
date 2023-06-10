const fs = require("fs");

class Database {
  constructor(path) {
    this.path = path;
  }

  showDatabase() {
    //read file
    const userData = fs.readFileSync(this.path, "utf8").split(`;`);

    //validate in case that "db" is empty
    if (userData[0] !== "") {
      const userDataParsed = userData.map((data) => {
        return JSON.parse(data);
      });
      console.log(userDataParsed);
    } else {
      console.log("\nYour database is empty. \n");
    }
  }

  updateDatabase(newData) {
    //read file
    const userData = fs.readFileSync(this.path, "utf8").split(`;`);

    //validate in case that "db" is empty
    if (userData[0] !== "") {
      //parsed it
      const userDataParsed = userData.map((data) => {
        return JSON.parse(data);
      });

      //create new const with updated values
      const userDataParsedUpdated = [...userDataParsed, newData];

      //write updated data into db
      fs.writeFileSync(
        this.path,
        JSON.stringify(userDataParsedUpdated)
          .replaceAll("},", "};")
          .slice(1)
          .slice(0, -1)
      );
    } else {
      fs.writeFileSync(
        this.path,
        JSON.stringify([newData]).replaceAll("},", "};").slice(1).slice(0, -1)
      );
    }
  }

  findUser(name) {
    const userData = fs.readFileSync(this.path, "utf8").split(`;`);

    if (userData[0] !== "") {
      const userDataParsed = userData.map((data) => {
        return JSON.parse(data);
      });
      //found using map where name the same after it filter all null values
      const foundedUser = userDataParsed
        .map((user) => {
          return user.name.toLowerCase() === name.toLowerCase() ? user : null;
        })
        .filter((value) => value !== null);
      //validate in case that user not found
      if (foundedUser.length !== 0) {
        return foundedUser;
      } else {
        return `\nUser "${name}" not found.\n`;
      }
    } else {
      return "\nYour database is empty. \n";
    }
  }
}

module.exports = Database;
