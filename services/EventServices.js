
const { Op } = require("sequelize");
const Models = require("../models");
const dayjs = require("dayjs");

// Each class creates a class object that is repsonsible for the database manipulations.
// I've opted to keep this logic outside of the controller as a means to further separate concerns.
// These class object functions all receive the params they require to do basic CRUD operations in mysql.
// Whereas the controllers only need to handle arranging the data to send these functions and returning a response to the front end

// The basic structure of each function is the same;
// firstly, the CRUD operation is awaited and the result is stored.
// If errors occur, they are handled within the controller.
// If no errors occur, the class object function returns an object with at least a response message and the data/payload (where applicable)
class EventServices {
  // I've used sequelizes [Op.or] and [Op.gte] to handle OR and 'greater than or equal to' within mysql queries
  async getEventPlannerEvents(id) {
    const foundEvents = await Models.Event.findAll({
      where: {
        event_planner_id: id,
        [Op.or]: [
          { endDateTime: { [Op.gte]: dayjs().toDate() } },
          { endDateTime: null },
        ],
      },
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
