const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    emailAddress: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "email_and_type",
    },
    phoneNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING(50),
    },
    websiteUrl: {
      type: DataTypes.STRING(200),
    },
    accountType: {
      type: DataTypes.STRING(20),
      unique: "email_and_type",
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "users",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = User;
