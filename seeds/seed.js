const sequelize = require("../config/connection");
const Entry = require("../models/Entry");
const User = require("../models/User");
const users = require("./users.json");
const entries = require("./entries.json");
// console.log(users);

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(users, {
    individualHooks: true,
    returning: true,
  });

  await Entry.bulkCreate(entries);

  process.exit(0);
};

seedDatabase();
