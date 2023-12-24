const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class EventTypeService extends Model {}

EventTypeService.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "event_type_services",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = EventTypeService;
