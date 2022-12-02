const { DataTypes } = require("sequelize");

const db = require("../config/dbConnection");

const User = db.define(
  "ms_user",
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(["pending", "registered", "verified"]),
    },
  },
  {
    paranoid: true,
    tableName: "ms_user",
  }
);

module.exports = User;
