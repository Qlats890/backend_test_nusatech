const { DataTypes } = require("sequelize");

const db = require("../config/dbConnection");

const Currency = db.define(
  "currency",
  {
    id_currency: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    tableName: "currency",
  }
);

module.exports = Currency;
