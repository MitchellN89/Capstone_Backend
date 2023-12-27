const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class VendorLocationPreference extends Model {}

VendorLocationPreference.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "vendor_location_preferences",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = VendorLocationPreference;
