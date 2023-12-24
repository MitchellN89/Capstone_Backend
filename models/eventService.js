const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class EventService extends Model {}

EventService.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    startDateTime: {
      type: DataTypes.DATE,
    },
    endDateTime: {
      type: DataTypes.DATE,
    },
    boardcast: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    requestBody: {
      type: DataTypes.TEXT,
    },
    address: {
      type: DataTypes.STRING(200),
    },
    confirmed_vendor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "event_services",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = EventService;
