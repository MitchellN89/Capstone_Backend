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
    },
    endDateTime: {
      type: DataTypes.DATE,
    },
    primaryAddress: {
      type: DataTypes.STRING(200),
    },
    endClientFirstName: {
      type: DataTypes.STRING(50),
    },
    endClientLastName: {
      type: DataTypes.STRING(50),
    },
    endClientEmailAddress: {
      type: DataTypes.STRING(100),
    },
    endClientPhoneNumber: {
      type: DataTypes.STRING(50),
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
