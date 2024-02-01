const Models = require("../models");
const { Op } = require("sequelize");
const dayjs = require("dayjs");

class EventServiceServices {
  async getEventPlannerEventServices(eventId, eventPlannerId) {
    const options = { context: { eventPlannerId } };
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
    const newEventService = await Models.EventService.create(
      { ...body, eventId, broadcast: false, vendorId: null }
      // options
    );

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
