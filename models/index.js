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

User.hasMany(Event, { foreignKey: "event_planner_id" });
Event.belongsTo(User, { foreignKey: "event_planner_id" });

Location.hasMany(Event);
Event.belongsTo(Location);

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
