const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const User = require("./user");
const material = require("./material");

// 🔹 (User)
User.hasMany(material, { foreignKey: "user_id" });

// (material)
material.belongsTo(User, {
  foreignKey: "user_id",
});

sequelize
  .sync()
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing models:", err);
  });

module.exports = {
  sequelize,
  User,
  material,
};
