const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class EventPlannerEventTemplate extends Model {}

EventPlannerEventTemplate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "type_and_event_planner",
    },
    eventPlannerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "type_and_event_planner",
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "event_planner_event_templates",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = EventPlannerEventTemplate;
