const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class BlackList extends Model {}

BlackList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "black_lists",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = BlackList;
