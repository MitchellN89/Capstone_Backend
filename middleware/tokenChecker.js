const { Token } = require("../utilities");

async function tokenChecker(req, res, next) {
  const token = new Token();
  // get the token from the request header
  const userToken = req.headers.authorization.split(" ")[1];

  // decode and store token payload in result
  const result = await token.verify(userToken);

  // adding the payload to custom fields in the req - this is required for most requests, I want the ACTUAL user data.
  // This step helps prevent the frontend user from altering the React Context and faking being a different user. I.e - if they manipulate the context, the token will still show who they are and if they manipulate that, they void the tokens authenticity.
  if (result.tokenValid) {
    const { data } = result;
    for (let key in data) {
      req[key] = data[key];
    }
    next();
  } else {
    // if the token is not authorised, interrupt the req and send back a status 401 (Unauthorised).
    return res.status(401).json({ response: "Unauthorised Token" });
  }
}

module.exports = tokenChecker;
