const Models = require("../models");

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
    eventPlannerId,
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
      response: `${dbResponse} event service(s) deleted`,
      count: dbResponse[0],
    };
  }
}

module.exports = EventServices;
