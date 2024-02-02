const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class WhiteList extends Model {}

WhiteList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "white_lists",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = WhiteList;
