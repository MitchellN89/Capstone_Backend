const jwt = require("jsonwebtoken");

class Token {
  sign(data) {
    const JWT_KEY = process.env.JWT_KEY;
    return jwt.sign(data, JWT_KEY, { expiresIn: "1h" });
  }
  async verify(token) {
    const JWT_KEY = process.env.JWT_KEY;
    try {
      const decoded = await jwt.verify(token, JWT_KEY);
      return {
        tokenValid: true,
        response: "Token is authentic",
        data: decoded,
      };
    } catch (err) {
      return { tokenValid: false, response: "Token is NOT authentic" };
    }
  }
  refresh(token) {}
}

module.exports = Token;
