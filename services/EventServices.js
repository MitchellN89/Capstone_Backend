const { Sequelize } = require("../dbConnect");
const Models = require("../models");
// const { sequelize } = require("../models/user");
const { Op } = require("sequelize");

// TODO - COMMENTS

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

  async getVendorEvents(vendorId) {
    const foundEvents = await Models.EventService.findAll({
      where: { vendorId },
      include: [
        { model: Models.Event },
        { model: Models.VendorEventConnection },
        { model: Models.Service },
      ],
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

  async createEventServiceWithUserCheck(eventId, eventPlannerId, body) {
    // const options = { context: { eventPlannerId } };
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

  // TODO - Disable this maybe
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
    const requests = await Models.EventService.findAll({
      where: { broadcast: true, vendorId: null },
      attributes: ["id", "serviceId", "tags", "volumes"],
      include: [
        {
          model: Models.Event,
          where: { archived: false },
          attributes: ["eventName", "startDateTime", "endDateTime", "address"],
        },
        {
          model: Models.VendorEventConnection,
          // where: { vendorStatus: Sequelize.literal(`<> 'ignore'`) },
          required: false,
          attributes: ["vendorStatus"],
        },
        { model: Models.Service },
      ],
    });
    const count = requests.length;

    return { response: `${count} requests(s) found`, data: requests };
  }

  async getOneServiceRequest(requestId, vendorId) {
    const serviceRequest = await Models.EventService.findOne({
      where: { id: requestId, broadcast: true, vendorId: null },
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
            "startDateTime",
            "endDateTime",
            "address",
            "imageUrl",
            "venue",
          ],
          where: { archived: false },
          include: [{ model: Models.User, attributes: ["id"] }],
        },
        {
          //COMEBACKTO - eventually, include chats instead and just use this through as where conditioning
          model: Models.VendorEventConnection,
          where: { vendorId },
          required: false,
        },
        { model: Models.Service },
      ],
    });

    return { response: `1 service request found`, data: serviceRequest };
  }

  async connectToServiceRequest(
    eventServiceId,
    vendorId,
    vendorStatus,
    message,
    createdAt,
    eventPlannerId
  ) {
    // TODO - Check validation
    const newConnection = await Models.VendorEventConnection.create({
      vendorId,
      vendorStatus,
      eventServiceId,
    });

    const { id: vendorEventConnectionId } = newConnection;
    console.log("### eventPlannerId: ", eventPlannerId);

    await Models.ChatEntry.create({
      senderId: vendorId,
      recipientId: eventPlannerId,
      vendorEventConnectionId,
      message,
      createdAt,
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

  async getServiceConnections(eventServiceId, eventPlannerId) {
    const serviceConnections = await Models.VendorEventConnection.findAll({
      include: [
        {
          model: Models.EventService,
          where: { id: eventServiceId },
          attributes: [],
          include: [
            { model: Models.Event, attributes: [], where: { eventPlannerId } },
          ],
        },
        {
          model: Models.User,
          attributes: [
            "companyName",
            "id",
            "websiteUrl",
            "firstName",
            "lastName",
            // TODO ratings summary
          ],
        },
      ],
    });

    const count = serviceConnections.length;
    return {
      response: `${count} service connections found`,
      count,
      data: serviceConnections,
    };
  }

  async getOneServiceConnectionByVendorId(
    vendorId,
    eventServiceId,
    eventPlannerId
  ) {
    const serviceConnection = await Models.VendorEventConnection.findOne({
      where: { vendorId: vendorId },
      include: [
        {
          model: Models.EventService,
          where: { id: eventServiceId },
          attributes: [],
          include: [
            { model: Models.Event, attributes: [], where: { eventPlannerId } },
          ],
        },
        {
          model: Models.User,
          attributes: [
            "companyName",
            "id",
            "websiteUrl",
            "firstName",
            "lastName",
            "emailAddress",
            "phoneNumber",
            // TODO ratings extended
          ],
        },
        { model: Models.ChatEntry },
      ],
    });

    return {
      response: "Successfully found service connection",
      data: serviceConnection,
    };
  }

  // async getOneServiceConnectionById(
  //   serviceConnectionId,
  //   eventServiceId,
  //   eventPlannerId
  // ) {
  //   console.log(serviceConnectionId, eventServiceId, eventPlannerId);
  //   const serviceConnection = await Models.VendorEventConnection.findOne({
  //     where: { id: serviceConnectionId },
  //     include: [
  //       {
  //         model: Models.EventService,
  //         where: { id: eventServiceId },
  //         attributes: [],
  //         include: [
  //           { model: Models.Event, attributes: [], where: { eventPlannerId } },
  //         ],
  //       },
  //       {
  //         model: Models.User,
  //         attributes: [
  //           "companyName",
  //           "id",
  //           "websiteUrl",
  //           "firstName",
  //           "lastName",
  //           "emailAddress",
  //           "phoneNumber",
  //           // TODO ratings extended
  //         ],
  //       },
  //       { model: Models.ChatEntry },
  //     ],
  //   });

  //   console.log("serviceConnection by ID: ", serviceConnection);
  //   return {
  //     response: "Successfully found service connection",
  //     data: serviceConnection,
  //   };
  // }

  async getOneBlindVendorServiceConnection(vendorId, serviceRequestId) {
    const serviceConnection = await Models.VendorEventConnection.findOne({
      where: { vendorId, eventServiceId: serviceRequestId },
      include: [
        { model: Models.ChatEntry },
        {
          model: Models.EventService,
          attributes: ["id"],
          include: [
            {
              model: Models.Event,
              attributes: ["id"],
              include: [
                {
                  model: Models.User,
                  required: true,
                  attributes: ["id", "firstName"],
                },
              ],
            },
          ],
        },
      ],
    });
    return { data: serviceConnection };
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

module.exports = EventServices;
