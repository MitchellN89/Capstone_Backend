const User = require("./user"),
  Event = require("./event"),
  EventService = require("./eventService"),
  EventType = require("./eventType"),
  EventTypeService = require("./eventTypeService"),
  Location = require("./location"),
  Service = require("./service"),
  VendorEventServiceRegister = require("./vendorEventServiceRegister"),
  VendorLocationPerference = require("./vendorLocationPreference");

async function init() {
  await User.sync();
  await Event.sync();
  await EventService.sync();
  await EventType.sync();
  await EventTypeService.sync();
  await Location.sync();
  await Service.sync();
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
