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
    vendorClosingResponse: {
      type: DataTypes.TEXT,
    },
    clientClosingResponse: {
      type: DataTypes.TEXT,
    },
    clientStatus: {
      type: DataTypes.STRING(30),
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: "vendor_event_connections",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = VendorEventConnection;
