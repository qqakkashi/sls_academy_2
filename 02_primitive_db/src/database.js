const fs = require("fs");

class Database {
  constructor(path) {
    this.path = path;
  }

  showDatabase() {
    const userData = fs.readFileSync(this.path, "utf8").split(`;`);
    const userDataParsed = userData.map((data) => {
      return JSON.parse(data);
    });
    return userDataParsed;
  }

  updateDatabase(newData) {
    //read file
    const userData = fs.readFileSync(this.path, "utf8").split(`;`);

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
  }

  findUser(name) {
    const userData = fs.readFileSync(this.path, "utf8").split(`;`);

    const userDataParsed = userData.map((data) => {
      return JSON.parse(data);
    });

    //found using map where name the same after it filter all null values
    const foundedUser = userDataParsed
      .map((user) => {
        return user.name.toLowerCase() === name.toLowerCase() ? user : null;
      })
      .filter((value) => value !== null);
    return foundedUser;
  }
}

module.exports = Database;
