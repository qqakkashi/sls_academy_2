const fs = require("fs");

const usersVacation = JSON.parse(fs.readFileSync("./vacations.json", "utf8"));

const parseUsers = () => {
  const mergedObjects = {};

  const parsedUsers = usersVacation.map((userData) => {
    return {
      userId: userData.user._id,
      userName: userData.user.name,
      vacations: [{ startDate: userData.startDate, endDate: userData.endDate }],
    };
  });

  parsedUsers.forEach((userData) => {
    const { userId } = userData;

    if (mergedObjects[userId]) {
      mergedObjects[userId].vacations.push(...userData.vacations);
    } else {
      mergedObjects[userId] = userData;
    }
  });
  return Object.values(mergedObjects);
};
console.log(parseUsers());
