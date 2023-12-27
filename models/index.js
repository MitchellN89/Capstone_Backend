const { Sequelize } = require("../dbConnect");
const User = require("./user"),
  Event = require("./event"),
  EventService = require("./eventService"),
  EventType = require("./eventType"),
  EventTypeService = require("./eventTypeService"),
  Location = require("./location"),
  Service = require("./service"),
  VendorEventServiceRegister = require("./vendorEventServiceRegistration"),
  VendorLocationPerference = require("./vendorLocationPreference");

User.belongsToMany(Location, {
  through: VendorLocationPerference,
  foreignKey: "vendor_id",
  uniqueKey: "location_and_vendor",
});
Location.belongsToMany(User, {
  through: VendorLocationPerference,
  uniqueKey: "location_and_vendor",
});

User.hasMany(Event, {
  foreignKey: { name: "eventPlannerId", allowNull: false },
});
Event.belongsTo(User, {
  foreignKey: { name: "eventPlannerId", allowNull: false },
});

Location.hasMany(Event, { foreignKey: { allowNull: false } });
Event.belongsTo(Location, { foreignKey: { allowNull: false } });

Event.hasMany(EventService);
EventService.belongsTo(Event);

Service.hasMany(EventService);
EventService.belongsTo(Service);

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
};
