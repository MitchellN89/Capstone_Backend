const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

const Event = require("./event");

class EventService extends Model {}

EventService.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    broadcast: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    requestBody: {
      type: DataTypes.TEXT,
    },
    confirmedVendor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    volumes: {
      type: DataTypes.STRING(50),
    },
    tags: {
      type: DataTypes.STRING(100),
    },
    logistics: {
      type: DataTypes.TEXT,
    },
    specialRequirements: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "event_services",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    // hooks: {
    //   beforeCreate: async (eventService, options) => {
    //     const eventId = eventService.eventId;
    //     const { eventPlannerId } = options.context; // Access userId from the attributes\
    //     // Fetch the associated Event with its User

    //     const event = await Event.findOne({
    //       where: { id: eventId },
    //     });

    //     // Check if the event exists and is owned by the user
    //     if (!event || event.eventPlannerId !== eventPlannerId) {
    //       const error = new Error("User is not authorised to take this action");
    //       error.code = 401;
    //       throw error;
    //     }
    //   },
    // },
  }
);

module.exports = EventService;
