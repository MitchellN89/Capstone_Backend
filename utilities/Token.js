const jwt = require("jsonwebtoken");

class Token {
  sign(user) {
    const JWT_KEY = process.env.JWT_KEY;
    const { id, accountType } = user;
    const data = { id, accountType };

    return jwt.sign(data, JWT_KEY, { expiresIn: "1h" });
  }

  async verify(token) {
    const JWT_KEY = process.env.JWT_KEY;

    return jwt.verify(token, JWT_KEY, (err, decoded) => {
      if (err) {
        return { tokenValid: false, response: "Token is NOT authentic" };
      } else {
        return {
          tokenValid: true,
          response: "Token is authentic",
          data: decoded,
        };
      }
    });
  }

  refresh(token) {}
}

module.exports = Token;
