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

    if (!foundEvents.length) {
      return {
        response: "No events found",
        count,
      };
    }

    return { response: `${count} event(s) found`, data: foundEvents, count };
  }

  async getVendorEvents() {} //TODO - Not implemented
  async getVendorEventByPK() {} //TODO - Not implemented
  async getEventPlannerEventByPK() {} //TODO - Not implemented

  async createEvent(eventPlannerId, body) {
    const newEvent = await Models.Event.create({ ...body, eventPlannerId });

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

  async createEventServiceWithUserCheck(eventId, eventPlannerId, body) {
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

  async changeEventServiceBroadcast(
    eventId,
    eventServiceId,
    eventPlannerId,
    operation
  ) {
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

  async connectToBroadcast(broadcastId, vendorId, body) {}
}

module.exports = EventServices;
