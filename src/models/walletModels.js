const { DataTypes } = require("sequelize");
const db = require("../config/dbConnection");

const User = require("./userModels");
const Currency = require("./currencyModels");

const Wallet = db.define(
  "wallet",
  {
    id_wallet: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    tableName: "wallet",
  }
);

User.hasMany(Wallet)
Wallet.belongsTo(User)

Currency.hasOne(Wallet)
Wallet.belongsTo(Currency)

module.exports = Wallet;
