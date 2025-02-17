const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const material = sequelize.define(
  "material",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name_ar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    barcode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    currency_ar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price_1: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price_2: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price_3: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price_4: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tax_percentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tax_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unit: {
      type: DataTypes.ENUM("grams", "kilograms"),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = material;
