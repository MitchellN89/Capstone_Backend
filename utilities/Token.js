const jwt = require("jsonwebtoken");

class Token {
  sign(user) {
    const JWT_KEY = process.env.JWT_KEY; //grab the secret_key from the .env file
    const { id, accountType } = user;
    const data = { id, accountType };

    // create a token using the data (id & accountType) and the secret_key, give 1hr expiry.
    return jwt.sign(data, JWT_KEY, { expiresIn: "12h" }); //return the key back to the caller
  }

  async verify(token) {
    const JWT_KEY = process.env.JWT_KEY;

    return jwt.verify(token, JWT_KEY, (err, decoded) => {
      if (err) {
        // if the token is NOT valid, send back object to caller
        return { tokenValid: false, response: "Token is NOT authentic" };
      } else {
        // if it is valid, send back to caller along with decoded data
        return {
          tokenValid: true,
          response: "Token is authentic",
          data: decoded,
        };
      }
    });
  }

  refresh(token) {} //placeholder to refresh token
}

module.exports = Token;
