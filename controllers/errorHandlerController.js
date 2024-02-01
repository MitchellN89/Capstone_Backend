const sendError = (err, operation, res) => {
  if (err.name) {
    switch (err.name) {
      case "SequelizeUniqueConstraintError":
        err.code = 409;
        break;
      default:
        err.code = 500;
    }
  }

  console.error(`An error has occurred during ${operation}`, err);
  res.status(err.code || 500).json({ message: err.message, name: err.name });
};

module.exports = { sendError };
