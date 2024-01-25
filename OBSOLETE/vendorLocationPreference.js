// const { DataTypes, Model } = require("sequelize");
// let dbConnect = require("../dbConnect");
// const sequelizeInstance = dbConnect.Sequelize;

// class VendorLocationPreference extends Model {}

// VendorLocationPreference.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     location: {
//       type: DataTypes.STRING(100),
//       unique: "vendor_location",
//     },
//     vendorId: {
//       type: DataTypes.INTEGER,
//       unique: "vendor_location",
//     },
//   },
//   {
//     sequelize: sequelizeInstance,
//     modelName: "vendorLocationPreferences",
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     // as: "locations",
//   }
// );

// module.exports = VendorLocationPreference;
