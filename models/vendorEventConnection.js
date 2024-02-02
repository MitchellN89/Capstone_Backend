const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class VendorEventConnection extends Model {}

VendorEventConnection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vendorStatus: {
      type: DataTypes.STRING(30),
    },
    clientStatus: {
      type: DataTypes.STRING(30),
    },
    eventServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "event_service_vendor",
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "event_service_vendor",
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "vendorEventConnections",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = VendorEventConnection;
