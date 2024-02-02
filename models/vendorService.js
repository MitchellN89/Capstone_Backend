const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class VendorService extends Model {}

VendorService.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "vendor_services",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = VendorService;
