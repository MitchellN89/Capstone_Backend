const { Sequelize } = require("../dbConnect");
const User = require("./user"),
  Event = require("./event"),
  EventService = require("./eventService"),
  EventType = require("./eventType"),
  EventTypeService = require("./eventTypeService"),
  Location = require("./location"),
  Service = require("./service"),
  VendorEventServiceRegister = require("./vendorEventServiceRegistration"),
  VendorLocationPerference = require("./vendorLocationPreference"),
  VendorService = require("./vendorService"),
  WhiteList = require("./whiteList"),
  BlackList = require("./blackList");

User.belongsToMany(Location, {
  through: VendorLocationPerference,
  foreignKey: { name: "vendorId", allowNull: false },
  uniqueKey: "location_and_vendor",
});
Location.belongsToMany(User, {
  through: VendorLocationPerference,
  uniqueKey: "location_and_vendor",
  foreignKey: { name: "locationId", allowNull: false },
});

User.hasMany(Event, {
  foreignKey: { name: "eventPlannerId", allowNull: false },
});
Event.belongsTo(User, {
  foreignKey: { name: "eventPlannerId", allowNull: false },
});

Location.hasMany(Event, { foreignKey: { allowNull: false } });
Event.belongsTo(Location, { foreignKey: { allowNull: false } });

Event.belongsToMany(Service, {
  through: EventService,
  foreignKey: { name: "eventId", allowNull: false },
});
Service.belongsToMany(Event, {
  through: EventService,
  foreignKey: { name: "serviceId", allowNull: false },
});

EventService.belongsToMany(User, {
  through: VendorEventServiceRegister,
});
User.belongsToMany(EventService, {
  through: VendorEventServiceRegister,
  foreignKey: "vendor_id",
});

Service.belongsToMany(EventType, {
  through: EventTypeService,
  uniqueKey: "event_type_and_service",
});
EventType.belongsToMany(Service, {
  through: EventTypeService,
  uniqueKey: "event_type_and_service",
});

User.belongsToMany(Service, {
  through: VendorService,
  foreignKey: { name: "vendorId" },
});
Service.belongsToMany(User, {
  through: VendorService,
  foreignKey: { name: "serviceId" },
});

User.belongsToMany(User, {
  through: WhiteList,
  as: "whiteListing",
  foreignKey: { name: "userId", allowNull: false },
});
User.belongsToMany(User, {
  through: WhiteList,
  as: "whiteListed",
  foreignKey: { name: "targetId", allowNull: false },
});

User.belongsToMany(User, {
  through: BlackList,
  as: "blackListing",
  foreignKey: { name: "userId", allowNull: false },
});
User.belongsToMany(User, {
  through: BlackList,
  as: "blackListed",
  foreignKey: { name: "targetId", allowNull: false },
});

async function init() {
  await User.sync();
  await Location.sync();
  await Event.sync();
  await Service.sync();
  await EventService.sync();

  await EventType.sync();
  await EventTypeService.sync();
  await VendorEventServiceRegister.sync();
  await VendorLocationPerference.sync();
  await VendorService.sync();
  await WhiteList.sync();
  await BlackList.sync();
}

init();

module.exports = {
  User,
  Event,
  EventService,
  EventType,
  EventTypeService,
  Location,
  Service,
  VendorEventServiceRegister,
  VendorLocationPerference,
  VendorService,
  WhiteList,
  BlackList,
};
