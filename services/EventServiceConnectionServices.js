const Models = require("../models");

class EventServiceConnectionServices {
  async getOneServiceRequest(eventServiceId, vendorId) {
    const serviceRequest = await Models.EventService.findOne({
      where: { id: eventServiceId, broadcast: true, vendorId: null },
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
            "venue",
            "id",
          ],
          where: { archived: false },
          include: [{ model: Models.User, attributes: ["id"] }],
        },
        { model: Models.Service },
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

  async getOneBlindVendorServiceConnection(vendorId, eventServiceId) {
    const serviceConnection = await Models.VendorEventConnection.findOne({
      where: { vendorId, eventServiceId },
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
}

module.exports = EventServiceConnectionServices;
