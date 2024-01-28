const Models = require("../models");

class EventServices {
  // COMEBACKTO - I might not need this... review later
  async getEventPlannerEvents(id) {
    const foundEvents = await Models.Event.findAll({
      where: { event_planner_id: id },
      include: [{ model: Models.EventService, attributes: ["vendorId", "id"] }],
    });
    const count = foundEvents.length;

    return { response: `${count} event(s) found`, data: foundEvents, count };
  }

  async getVendorEvent(vendorId, eventServiceId) {
    const foundEvent = await Models.EventService.findOne({
      where: { vendorId, id: eventServiceId },
      include: [
        { model: Models.Event, include: [{ model: Models.User }] },
        {
          model: Models.VendorEventConnection,
          include: [{ model: Models.ChatEntry }],
        },
        { model: Models.Service },
      ],
    });

    return { response: `Successfully found event`, data: foundEvent };
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

  async createEvent(eventPlannerId, body) {
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
}

module.exports = EventServices;
