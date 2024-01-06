const { Sequelize } = require("../dbConnect");
const Models = require("../models");
const { sequelize } = require("../models/user");

// TODO - COMMENTS

class EventServices {
  // COMEBACKTO - I might not need this... review later
  async getEventPlannerEvents(id) {
    const foundEvents = await Models.Event.findAll({
      where: { event_planner_id: id },
    });
    const count = foundEvents.length;

    return { response: `${count} event(s) found`, data: foundEvents, count };
  }

  async getEventPlannerEvent(eventPlannerId, id) {
    const foundEvent = await Models.Event.findOne({
      where: { eventPlannerId, id },
      include: [{ model: Models.Service }],
    });

    if (!foundEvent) {
      return {
        response: "No event found",
      };
    }

    return {
      response: "Successfully found event",
      data: foundEvent,
    };
  }

  async getVendorEvents() {} //TODO - Not implemented
  async getVendorEventByPK() {} //TODO - Not implemented
  async getEventPlannerEventByPK() {} //TODO - Not implemented

  async createEvent(eventPlannerId, body) {
    console.log("___EventServices.js > createEvent > body: ", body);
    const newEvent = await Models.Event.create({
      ...body,
      eventPlannerId,
    });

    return {
      response: "Successfully created new event",
      data: newEvent,
    };
  }

  async deleteEvent(eventId, eventPlannerId) {
    const dbResponse = await Models.Event.destroy({
      where: { id: eventId, eventPlannerId: eventPlannerId },
    });

    return {
      response: `${dbResponse} event(s) deleted`,
      count: dbResponse[0],
    };
  }

  async updateEvent(eventId, eventPlannerId, body) {
    const dbResponse = await Models.Event.update(
      { ...body, eventPlannerId, id: eventId },
      { where: { id: eventId, eventPlannerId: eventPlannerId } }
    );

    return {
      response: `${dbResponse} event(s) updated`,
      count: dbResponse[0],
    };
  }

  async getServices() {
    const services = await Models.Service.findAll({});
    const count = services.length;

    return { response: `${count} service(s) found`, data: services, count };
  }

  async getEventServices(eventId, eventPlannerId) {
    const options = { context: { eventPlannerId } };
    const eventServices = await Models.EventService.findAll({
      where: { eventId },
    });

    const count = eventServices.length;

    return {
      response: `${count} sevent service(s) found`,
      data: eventServices,
      count,
    };
  }

  async createEventServiceWithUserCheck(eventId, eventPlannerId, body) {
    const options = { context: { eventPlannerId } };
    const newEventService = await Models.EventService.create(
      { ...body, eventId, broadcast: false, vendorId: null },
      options
    );

    return {
      response: "Successfully created new Event Service",
      data: newEventService,
      _userIsAuthorised: true,
    };
  }

  async updateEventServiceWithUserCheck(
    eventId,
    eventServiceId,
    eventPlannerId, //TODO - this is for IN-MODEL security checks. At this stage, that functionality is disabled
    body
  ) {
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

  async deleteEventServiceWithUserCheck(
    eventId,
    eventServiceId,
    eventPlannerId
  ) {
    const dbResponse = await Models.EventService.destroy({
      where: { id: eventServiceId },
    });

    return {
      response: `${dbResponse[0]} event service(s) deleted`,
      count: dbResponse[0],
    };
  }

  async enableEventServiceBroadcast(
    eventId,
    eventServiceId,
    eventPlannerId,
    operation
  ) {
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

  async disableEventServiceBroadcast(
    eventId,
    eventServiceId,
    eventPlannerId,
    operation
  ) {
    const dbResponse = await Models.EventService.update(
      {
        broadcast: false,
      },
      { where: { id: eventServiceId }, operation }
    );

    return {
      response: `${dbResponse[0]} broadcasts set to false`,
      count: dbResponse[0],
    };
  }

  async getServiceRequests() {
    // TODO - Needs to accomodate blacklist & whitelist

    const requests = await Models.EventService.findAll({
      where: { broadcast: true },
      attributes: ["id", "requestBody", "serviceId", "tags", "volumes"],
      include: [
        {
          model: Models.Event,
          where: { archived: false },
          attributes: ["eventName", "startDateTime", "endDateTime", "address"],
        },
      ],
    });
    const count = requests.length;

    return { response: `${count} requests(s) found`, data: requests };
  }

  async getServiceRequest(requestId) {
    const serviceRequest = await Models.EventService.findOne({
      where: { id: requestId, broadcast: true },
      attributes: [
        "id",
        "requestBody",
        "volumes",
        "tags",
        "logistics",
        "specialRequirements",
      ],
      include: [
        {
          model: Models.Event,
          attributes: [
            "eventName",
            "stateDateTime",
            "endDateTime",
            "address",
            "imageUrl",
            "venue",
          ],
        },
      ],
    });

    return { response: `1 service request found`, data: serviceRequest };
  }

  async connectToServiceRequest(
    eventServiceId,
    vendorId,
    vendorResponse = null
  ) {
    // TODO - Check validation
    const newConnection = await Models.VendorEventConnection.create({
      vendorId,
      vendorResponse,
      eventServiceId,
    });

    return {
      response: "Successfully created new connection to event",
    };
  }

  async updateEventPlannerEventBroadcastConnectionStatus(
    eventServiceId,
    eventPlannerId,
    clientResponse
  ) {
    // TODO - Check validation
    // TODO - clientResponse must be only a few different options
    const dbResponse = await Models.VendorEventConnection.update(
      {
        clientResponse,
      },
      { where: { eventServiceId } }
    );

    return {
      response: `${dbResponse} responses updated in event broadcast`,
    };
  }
}

module.exports = EventServices;
