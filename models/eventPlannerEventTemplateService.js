const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class EventPlannerEventTemplateService extends Model {}

EventPlannerEventTemplateService.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "eventPlannerEventTemplateService",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = EventPlannerEventTemplateService;
