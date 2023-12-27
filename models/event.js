const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    eventName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    primaryAddress: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    endClientFirstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    endClientLastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    endClientEmailAddress: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    endClientPhoneNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "events",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Event;
