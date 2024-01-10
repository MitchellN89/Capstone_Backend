const { DataTypes, Model, Sequelize } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class ChatEntry extends Model {}

ChatEntry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    messageRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "chatEntries",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = ChatEntry;
