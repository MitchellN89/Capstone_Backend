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
    vendorResponse: {
      type: DataTypes.STRING(30),
    },
    clientResponse: {
      type: DataTypes.STRING(30),
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
