const { DataTypes, Sequelize } = require("sequelize");
const db = require("../config/dbConnection");

const User = require("./userModels");

const Mailer = db.define(
  "mailer",
  {
    id_mailer: {
      type: DataTypes.UUID,
      defaultValue:Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(["pending", "registered", "verified", "expired"]),
    },
  },
  {
    paranoid: true,
    tableName: "mailer",
  }
);

User.hasMany(Mailer);
Mailer.belongsTo(User);

module.exports = Mailer;
