class DataFormatter {
  omitFields(fields, data) {
    const omittedData = { ...data.dataValues };
    for (let field of fields) {
      if (omittedData[field]) {
        delete omittedData[field];
      }
    }
    return omittedData;
  }
}

module.exports = DataFormatter;
