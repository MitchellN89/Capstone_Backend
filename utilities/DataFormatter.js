class DataFormatter {
  omitFields(fields, data) {
    // get the dataValues from the Sequelize object
    const omittedData = { ...data.dataValues };
    for (let field of fields) {
      if (omittedData[field]) {
        // for each field given in the params, delete this key from the object
        delete omittedData[field];
      }
    }
    // return the new object back
    // note, this isn't the original Sequelize object anymore, it's only suitable for omitting fields right before sending back as a response on the HTTP req.
    return omittedData;
  }
}

module.exports = DataFormatter;
