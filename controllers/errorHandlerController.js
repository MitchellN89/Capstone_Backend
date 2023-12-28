const sendError = (err, operation, res) => {
  let status;
  switch (err.code) {
    case 401:
      status = 401;
      break;
    default:
      status = 500;
  }

  console.error(`Error during ${operation}`, err);
  res.status(status).json({ response: err.message });
};

module.exports = { sendError };
