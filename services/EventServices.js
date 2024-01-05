const { Sequelize } = require("../dbConnect");
const Models = require("../models");
const { sequelize } = require("../models/user");

// TODO - COMMENTS

class EventServices {
  // COMEBACKTO - I might not need this... review later
  async getEventPlannerEvents(id) {
    console.log("ACTION - getEventPlannerEvents");
    const foundEvents = await Models.Event.findAll({
      where: { event_planner_id: id },
    });
    const count = foundEvents.length;

    return { response: `${count} event(s) found`, data: foundEvents, count };
  }

  async getEventPlannerEvent(eventPlannerId, id) {
    console.log("ACTION - getEventPlannerEvent");
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
    console.log("ACTION - createEvent");
    console.log("DATES CHECKER", body);

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
    console.log("ACTION - deleteEvent");
    const dbResponse = await Models.Event.destroy({
      where: { id: eventId, eventPlannerId: eventPlannerId },
    });

    return {
      response: `${dbResponse} event(s) deleted`,
      count: dbResponse[0],
    };
  }

  async updateEvent(eventId, eventPlannerId, body) {
    console.log("ACTION - updateEvent");
    const dbResponse = await Models.Event.update(
      { ...body, eventPlannerId, id: eventId },
      { where: { id: eventId, eventPlannerId: eventPlannerId } }
    );

    return {
      response: `${dbResponse} event(s) updated`,
      count: dbResponse[0],
    };
  }

  async getEventServices(eventId, eventPlannerId) {
    console.log("ACTION - getEventServices");
    const options = { context: { eventPlannerId } };
    const eventServices = await Models.EventService.findAll({
      where: { eventId },
    });

    return {
      response: "Success",
      data: eventServices,
    };
  }

  async createEventServiceWithUserCheck(eventId, eventPlannerId, body) {
    console.log("ACTION - createEventServiceWithUserCheck");
    const options = { context: { eventPlannerId } };
    const newEventService = await Models.EventService.create(
      { ...body, eventId },
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
    console.log("ACTION - updateEventServiceWithUserCheck");
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
    console.log("ACTION - deleteEventServiceWithUserCheck");
    const dbResponse = await Models.EventService.destroy({
      where: { id: eventServiceId },
    });

    return {
      response: `${dbResponse[0]} event service(s) deleted`,
      count: dbResponse[0],
    };
  }

  async changeEventServiceBroadcast(
    eventId,
    eventServiceId,
    eventPlannerId,
    operation
  ) {
    console.log("ACTION - changeEventServiceBroadcast");
    const dbResponse = await Models.EventService.update(
      {
        broadcast: sequelize.literal("NOT broadcast"),
      },
      { where: { id: eventServiceId }, operation }
    );

    return {
      response: `${dbResponse[0]} broadcasts set to true`,
      count: dbResponse[0],
    };
  }

  async getEventBroadcasts() {
    // TODO - Needs to accomodate blacklist & whitelist
    console.log("ACTION - getEventBroadcasts");
    const broadcasts = await Models.EventService.findAll({
      where: { broadcast: true },
      attributes: ["id", "startDateTime", "endDateTime", "requestBody"],
      include: [
        { model: Models.Service },
        {
          model: Models.Event,
          where: { archived: false },
          attributes: ["eventName"],
          include: [{ model: Models.Location }],
        },
      ],
    });
    const count = broadcasts.length;

    return { response: `${count} broadcast(s) found`, data: broadcasts };
  }

  async connectToBroadcast(eventServiceId, vendorId, vendorResponse = null) {
    console.log("ACTION - connectToEventBroadcast");
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
    console.log("ACTION - updateEventPlannerEveentBroadcastConnectionStatus");
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
