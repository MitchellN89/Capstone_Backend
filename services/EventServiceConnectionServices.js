const Models = require("../models");

// Each class creates a class object that is repsonsible for the database manipulations.
// I've opted to keep this logic outside of the controller as a means to further separate concerns.
// These class object functions all receive the params they require to do basic CRUD operations in mysql.
// Whereas the controllers only need to handle arranging the data to send these functions and returning a response to the front end

// The basic structure of each function is the same;
// firstly, the CRUD operation is awaited and the result is stored.
// If errors occur, they are handled within the controller.
// If no errors occur, the class object function returns an object with at least a response message and the data/payload (where applicable)
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
          model: Models.VendorEventConnection,
          where: { vendorId },
          required: false,
        },
      ],
    });
    return { response: `1 service request found`, data: serviceRequest };
  }

  async connectToServiceRequest(
    eventServiceId,
    vendorId,
    message,
    createdAt,
    eventPlannerId
  ) {
    const newConnection = await Models.VendorEventConnection.create({
      vendorId,
      vendorStatus: "connect",
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
                  attributes: [
                    "id",
                    "firstName",
                    "lastName",
                    "companyName",
                    "phoneNumber",
                    "emailAddress",
                    "websiteUrl",
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    return { data: serviceConnection };
  }

  async ignoreServiceRequest(eventServiceId, vendorId) {
    await Models.VendorEventConnection.create({
      vendorStatus: "ignore",
      vendorId,
      eventServiceId,
    });

    return { response: "Successfully set vendor response to 'ignore'" };
  }
}

module.exports = EventServiceConnectionServices;
