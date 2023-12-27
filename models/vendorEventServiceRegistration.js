const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class VendorEventServiceRegistration extends Model {}

VendorEventServiceRegistration.init(
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
    modelName: "vendor_evt_service_registrations",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = VendorEventServiceRegistration;
