const { Sequelize } = require("../dbConnect");
// const ServiceServices = require("../services/ServiceServices");

const User = require("./user"),
  Event = require("./event"),
  EventService = require("./eventService"),
  EventPlannerEventTemplate = require("./eventPlannerEventTemplate"),
  EventPlannerEventTemplateService = require("./eventPlannerEventTemplateService"),
  Service = require("./service"),
  VendorEventConnection = require("./vendorEventConnection"),
  VendorLocationPerference = require("./vendorLocationPreference"),
  VendorService = require("./vendorService"),
  WhiteList = require("./whiteList"),
  BlackList = require("./blackList"),
  ChatEntry = require("./chatEntry");

// Each EventPlanner has many Events
User.hasMany(Event, {
  foreignKey: { name: "eventPlannerId", allowNull: false },
});
// Each Event belongs to an EventPlanner
Event.belongsTo(User, {
  foreignKey: { name: "eventPlannerId", allowNull: false },
});
// =====================================

// Each Event has many Services, through EventService
Event.belongsToMany(Service, {
  through: EventService,
  foreignKey: { name: "eventId", allowNull: false },
});
// Each Service has many Events, through EventService
Service.belongsToMany(Event, {
  through: EventService,
  foreignKey: { name: "serviceId", allowNull: false },
});
// =====================================

// Each EventService belongs to an Event
EventService.belongsTo(Event, { foreignKey: { name: "eventId" } });
// Each Event has many EventServices
Event.hasMany(EventService, { foreignKey: { name: "eventId" } });
// =====================================

EventService.belongsTo(Service, { foreignKey: { name: "serviceId" } });
Service.hasMany(EventService, { foreignKey: { name: "serviceId" } });

// Each EventService belongs to many Vendors
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

Service.belongsToMany(EventPlannerEventTemplate, {
  through: EventPlannerEventTemplateService,
  uniqueKey: "event_type_and_service",
});
EventPlannerEventTemplate.belongsToMany(Service, {
  through: EventPlannerEventTemplateService,
  uniqueKey: "event_type_and_service",
});

User.hasMany(EventPlannerEventTemplate, {
  foreignKey: {
    name: "eventPlannerId",
    allowNull: false,
  },
});
EventPlannerEventTemplate.belongsTo(User, {
  foreignKey: {
    name: "eventPlannerId",
    allowNull: false,
  },
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

User.hasMany(EventService, { foreignKey: { name: "vendorId" } });
EventService.belongsTo(User, { foreignKey: { name: "vendorId" } });

User.hasMany(VendorLocationPerference, { foreignKey: { name: "vendorId" } });
VendorLocationPerference.belongsTo(User, { foreignKey: { name: "vendorId" } });

EventService.hasMany(VendorEventConnection, {
  foreignKey: { name: "eventServiceId" },
});
VendorEventConnection.belongsTo(EventService, {
  foreignKey: { name: "eventServiceId" },
});

VendorEventConnection.hasMany(ChatEntry, {
  foreignKey: { name: "vendorEventConnectionId" },
});
ChatEntry.belongsTo(VendorEventConnection, {
  foreignKey: { name: "vendorEventConnectionId" },
});

User.hasMany(ChatEntry, { foreignKey: { name: "senderId" } });
ChatEntry.belongsTo(User, { foreignKey: { name: "senderId" } });

User.hasMany(ChatEntry, { foreignKey: { name: "recipientId" } });
ChatEntry.belongsTo(User, { foreignKey: { name: "recipientId" } });

User.hasMany(VendorEventConnection, { foreignKey: { name: "vendorId" } });
VendorEventConnection.belongsTo(User, { foreignKey: { name: "vendorId" } });

async function init() {
  await User.sync();
  await Event.sync();
  await Service.sync();
  await EventService.sync();
  await EventPlannerEventTemplate.sync();
  await EventPlannerEventTemplateService.sync();
  await VendorEventConnection.sync();
  await VendorLocationPerference.sync();
  await VendorService.sync();
  await WhiteList.sync();
  await BlackList.sync();
  await ChatEntry.sync();
  // ServiceServices.populateServices(Service);
}

init();

module.exports = {
  User,
  Event,
  EventService,
  EventPlannerEventTemplate,
  EventPlannerEventTemplateService,
  ChatEntry,
  Service,
  VendorEventConnection,
  VendorLocationPerference,
  VendorService,
  WhiteList,
  BlackList,
};
