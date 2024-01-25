const Models = require("../models");

class ServiceServices {
  async getServices() {
    const services = await Models.Service.findAll({});
    const count = services.length;
    return { response: `${count} service(s) found`, data: services, count };
  }
}

module.exports = ServiceServices;
