const Models = require("../models");

// TODO - COMMENTS

class EventServices {
  async getAllEventPlannerEvents(id) {
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

  async getAllVendorEvents() {} //TODO - Not implemented
  async getVendorEvent() {} //TODO - Not implemented
  async getEventPlannerEvent() {} //TODO - Not implemented

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
}

module.exports = EventServices;
