const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Service extends Model {}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    service: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "services",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

// Service.afterSync(() => {
//   try {
//     Service.bulkCreate([
//       { service: "Caterer" },
//       { service: "Lighting Technician" },
//       { service: "Sound Technician" },
//       { service: "Party Equipment Supplier" },
//       { service: "Florist" },
//       { service: "Venue Arrangement Service" },
//       { service: "Security Service" },
//       { service: "Photography Service" },
//       { service: "Transportation Service" },
//       { service: "Decorator" },
//       { service: "DJ (Disc Jockey)" },
//       { service: "Audiovisual Equipment Rental" },
//       { service: "Stage Manager" },
//       { service: "Graphic Designer (for event materials)" },
//       { service: "Invitation Printing Service" },
//       { service: "Make-up Artist" },
//       { service: "Hairstylist" },
//       { service: "Costume Rental Service" },
//       { service: "Mobile Bar Service" },
//       { service: "Furniture Rental Company" },
//       { service: "Valet Parking Service" },
//       { service: "Event Cleaning Service" },
//       { service: "Ice Sculpture Artist" },
//       { service: "Balloon Artist" },
//       { service: "Mobile Restroom Rental" },
//       { service: "Fireworks Display Service" },
//       { service: "Live Band" },
//       { service: "Event Insurance Provider" },
//     ]);
//   } catch (err) {
//     console.log("Services already exist");
//   }
// });

module.exports = Service;
