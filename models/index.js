const { Sequelize } = require("../dbConnect");

const User = require("./user"),
  Event = require("./event"),
  EventService = require("./eventService"),
  Service = require("./service"),
  VendorEventConnection = require("./vendorEventConnection"),
  ChatEntry = require("./chatEntry");

// MySQL Table associations below

// Users have many events and events belong to users
User.hasMany(Event, {
  foreignKey: { name: "eventPlannerId", allowNull: false },
});
Event.belongsTo(User, {
  foreignKey: { name: "eventPlannerId", allowNull: false },
});

// Events belong to many Services and services belong to many Events. The join table for this many to many is EventService
Event.belongsToMany(Service, {
  through: EventService,
  foreignKey: { name: "eventId", allowNull: false },
});
Service.belongsToMany(Event, {
  through: EventService,
  foreignKey: { name: "serviceId", allowNull: false },
});

// EventService belongs to Event and Event has many EventServices
EventService.belongsTo(Event, { foreignKey: { name: "eventId" } });
Event.hasMany(EventService, { foreignKey: { name: "eventId" } });

// EventService belongs to many Services and Services have many EventServices
EventService.belongsTo(Service, { foreignKey: { name: "serviceId" } });
Service.hasMany(EventService, { foreignKey: { name: "serviceId" } });

// Event Service belongs to many User and Users belong to many Event Service.
// Join table is VendorEventConnection
EventService.belongsToMany(User, {
  through: VendorEventConnection,
  foreignKey: "eventServiceId",
  uniqueKey: "event_service_and_vendor",
});
User.belongsToMany(EventService, {
  through: VendorEventConnection,
  foreignKey: "vendorId",
  uniqueKey: "event_service_and_vendor",
});

// User has many EventServices and EventServices belongs to User
User.hasMany(EventService, { foreignKey: { name: "vendorId" } });
EventService.belongsTo(User, { foreignKey: { name: "vendorId" } });

// Event Service has many VendorEventConnections and VendorEventConnections belong to Event Service
EventService.hasMany(VendorEventConnection, {
  foreignKey: { name: "eventServiceId" },
});
VendorEventConnection.belongsTo(EventService, {
  foreignKey: { name: "eventServiceId" },
});

// Vendor Event Connect has many Chat entries, and chat entries belong to a vendor event connection
VendorEventConnection.hasMany(ChatEntry, {
  foreignKey: { name: "vendorEventConnectionId" },
});
ChatEntry.belongsTo(VendorEventConnection, {
  foreignKey: { name: "vendorEventConnectionId" },
});

// A user has many chat entries (as the sender)
User.hasMany(ChatEntry, { foreignKey: { name: "senderId" } });
ChatEntry.belongsTo(User, { foreignKey: { name: "senderId" } });

// A user has many chat etries (as a recipient)
User.hasMany(ChatEntry, { foreignKey: { name: "recipientId" } });
ChatEntry.belongsTo(User, { foreignKey: { name: "recipientId" } });

// Users have many VendorEventConnections
User.hasMany(VendorEventConnection, { foreignKey: { name: "vendorId" } });
VendorEventConnection.belongsTo(User, { foreignKey: { name: "vendorId" } });

async function init() {
  await User.sync();
  await Event.sync();
  await Service.sync();
  await EventService.sync();
  await VendorEventConnection.sync();
  await ChatEntry.sync();
}

init();

module.exports = {
  User,
  Event,
  EventService,
  ChatEntry,
  Service,
  VendorEventConnection,
};
