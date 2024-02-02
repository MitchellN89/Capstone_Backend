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
    imgUrl: {
      type: DataTypes.STRING(100),
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

// this is a start up routine.
// after syncing, mysql has the below added to Services.
// if they already exist, the operation is ignored
Service.afterSync(() => {
  try {
    Service.bulkCreate(
      [
        { service: "Caterer", imgUrl: "caterer.jpg" },
        { service: "Lighting Technician", imgUrl: "lighting.jpg" },
        { service: "Sound Technician", imgUrl: "soundtech.jpg" },
        { service: "Florist", imgUrl: "florist.jpg" },
        { service: "Security Service", imgUrl: "security.jpg" },
        { service: "Photography Service", imgUrl: "photography.jpg" },
        { service: "Decorator", imgUrl: "decorator.jpg" },
        { service: "DJ (Disc Jockey)", imgUrl: "dj.jpg" },
        { service: "Audiovisual Equipment Rental", imgUrl: "audiovisual.jpg" },
        { service: "Make-up Artist", imgUrl: "makeup.jpg" },
        { service: "Hairstylist", imgUrl: "hairstylist.jpg" },
        { service: "Costume Rental Service", imgUrl: "costume.jpg" },
        { service: "Event Cleaning Service", imgUrl: "cleaning.jpg" },
        { service: "Balloon Artist", imgUrl: "balloon.jpg" },
        { service: "Fireworks Display Service", imgUrl: "fireworks.jpg" },
        { service: "Live Band", imgUrl: "liveband.jpg" },
        { service: "Event Insurance Provider", imgUrl: "insurance.jpg" },
      ],
      { ignoreDuplicates: true }
    );
  } catch (err) {
    console.error(err);
  }
});

module.exports = Service;
