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
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
    modelName: "chat_entries",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = ChatEntry;
