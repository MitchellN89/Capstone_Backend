const Models = require("../models");

class EventServices {
  constructor() {}

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

  async getAllVendorEvents() {}
  async getVendorEvent() {}
  async getEventPlannerEvent() {}

  async createEvent(id, body) {
    const newEvent = await Models.Event.create({ ...body, eventPlannerId: id });

    return {
      response: "Successfully created new event",
      data: newEvent,
    };
  }

  async deleteEvent() {}
  async updateEvent() {}
  async toggleBroadcast() {}
}

module.exports = EventServices;
