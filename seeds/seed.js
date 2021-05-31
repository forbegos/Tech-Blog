const sequelize = require("../config/connection");
const User = require("../models/User");
const users = require("./users.json");
console.log(users);

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(users, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
