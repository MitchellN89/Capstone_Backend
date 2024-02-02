const Models = require("../models");

// Each class creates a class object that is repsonsible for the database manipulations.
// I've opted to keep this logic outside of the controller as a means to further separate concerns.
// These class object functions all receive the params they require to do basic CRUD operations in mysql.
// Whereas the controllers only need to handle arranging the data to send these functions and returning a response to the front end

// The basic structure of each function is the same;
// firstly, the CRUD operation is awaited and the result is stored.
// If errors occur, they are handled within the controller.
// If no errors occur, the class object function returns an object with at least a response message and the data/payload (where applicable)

class ServiceServices {
  async getServices() {
    const services = await Models.Service.findAll({});
    const count = services.length;
    return { response: `${count} service(s) found`, data: services, count };
  }
}

module.exports = ServiceServices;
