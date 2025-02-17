const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    last_name: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    },
  },
  {
    timestamps: true,
  }
);

User.sync();
module.exports = User;
