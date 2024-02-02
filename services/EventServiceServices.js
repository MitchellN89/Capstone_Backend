const Models = require("../models");
const { Op } = require("sequelize");
const dayjs = require("dayjs");

// Each class creates a class object that is repsonsible for the database manipulations.
// I've opted to keep this logic outside of the controller as a means to further separate concerns.
// These class object functions all receive the params they require to do basic CRUD operations in mysql.
// Whereas the controllers only need to handle arranging the data to send these functions and returning a response to the front end

// The basic structure of each function is the same;
// firstly, the CRUD operation is awaited and the result is stored.
// If errors occur, they are handled within the controller.
// If no errors occur, the class object function returns an object with at least a response message and the data/payload (where applicable)
class EventServiceServices {
  async getEventPlannerEventServices(eventId) {
    const eventServices = await Models.EventService.findAll({
      where: { eventId },
      include: [
        { model: Models.VendorEventConnection },
        { model: Models.Event, attributes: ["id"] },
      ],
    });

    const count = eventServices.length;

    return {
      response: `${count} sevent service(s) found`,
      data: eventServices,
      count,
    };
  }

  async createEventService(eventId, body) {
    const newEventService = await Models.EventService.create({
      ...body,
      eventId,
      broadcast: false,
      vendorId: null,
    });

    return {
      response: "Successfully created new Event Service",
      data: newEventService,
      _userIsAuthorised: true,
    };
  }

  async updateEventService(eventId, eventServiceId, body) {
    const dbResponse = await Models.EventService.update(
      {
        ...body,
        eventId,
        id: eventServiceId,
      },
      { where: { id: eventServiceId } }
    );

    return {
      response: `${dbResponse} event service(s) updated`,
      count: dbResponse[0],
    };
  }

  async deleteEventService(eventServiceId) {
    const dbResponse = await Models.EventService.destroy({
      where: { id: eventServiceId },
    });

    return {
      response: `${dbResponse[0]} event service(s) deleted`,
      count: dbResponse[0],
    };
  }

  async enableEventServiceBroadcast(eventServiceId, operation) {
    const dbResponse = await Models.EventService.update(
      {
        broadcast: true,
      },
      { where: { id: eventServiceId }, operation }
    );

    return {
      response: `${dbResponse[0]} broadcasts set to true`,
      count: dbResponse[0],
    };
  }

  async getVendorEvents(vendorId) {
    // I've used sequelizes [Op.or] and [Op.gte] to handle OR and 'greater than or equal to' within mysql queries
    const foundEvents = await Models.EventService.findAll({
      where: { vendorId },
      include: [
        {
          model: Models.Event,
          where: {
            [Op.or]: [
              { endDateTime: { [Op.gte]: dayjs().toDate() } },
              { endDateTime: null },
            ],
          },
        },
        { model: Models.VendorEventConnection, where: { vendorId } },
        { model: Models.Service },
      ],
    });

    const count = foundEvents.length;

    return { response: `${count} event(s) found`, data: foundEvents, count };
  }

  async getServiceRequests(vendorId) {
    const requests = await Models.EventService.findAll({
      where: { broadcast: true, vendorId: null },
      attributes: ["id", "serviceId", "tags", "volumes"],
      include: [
        {
          model: Models.Event,
          where: { archived: false },
          attributes: [
            "eventName",
            "startDateTime",
            "endDateTime",
            "address",
            "id",
          ],
        },
        {
          model: Models.VendorEventConnection,
          where: { vendorId },
          required: false,
          attributes: ["vendorStatus"],
        },
        { model: Models.Service },
      ],
    });
    const count = requests.length;

    return { response: `${count} requests(s) found`, data: requests };
  }

  async promoteVendor(vendorId, eventServiceId) {
    const dbResponse = await Models.EventService.update(
      { vendorId },
      { where: { id: eventServiceId } }
    );

    const count = dbResponse[0];

    return { response: `${count} promotions made`, count };
  }
}

module.exports = EventServiceServices;
