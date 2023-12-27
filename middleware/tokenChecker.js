const { Token } = require("../utilities");

async function tokenChecker(req, res, next) {
  const token = new Token();
  const userToken = req.headers.authorization.split(" ")[1];

  const result = await token.verify(userToken);

  if (result.tokenValid) {
    const { data } = result;
    for (let key in data) {
      req.body[key] = data[key];
    }
    next();
    console.log(result);
  } else {
    console.log(result);
    return res.status(401).json({ response: "Unauthorized Token" });
  }
}

module.exports = tokenChecker;
