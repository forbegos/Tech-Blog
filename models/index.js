const User = require("./User");
const Entry = require("./Entry");

Entry.belongsTo(User, {
  foreignKey: "user_id",
  allowNull: true,
});

// User.hasMany(Entry, {
//   foreignKey: "user-id",
//   allowNull: true,
//   onDelete: "CASCADE",
// });

module.exports = { User, Entry };
