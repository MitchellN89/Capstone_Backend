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
    startDateTime: {
      type: DataTypes.DATE,
    },
    endDateTime: {
      type: DataTypes.DATE,
    },
    boardcast: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    requestBody: {
      type: DataTypes.TEXT,
    },
    address: {
      type: DataTypes.STRING(200),
    },
    confirmed_vendor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "event_services",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    hooks: {
      beforeCreate: async (eventService, options) => {
        const eventId = eventService.eventId;
        const { eventPlannerId } = options.context; // Access userId from the attributes\
        // Fetch the associated Event with its User

        const event = await Event.findOne({
          where: { id: eventId },
        });

        // Check if the event exists and is owned by the user
        if (!event || event.eventPlannerId !== eventPlannerId) {
          const error = new Error("User is not authorised to take this action");
          error.code = 401;
          throw error;
        }
      },
    },
  }
);

module.exports = EventService;
