const bcrypt = require("bcrypt");

class Hasher {
  hash(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  compare(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

module.exports = Hasher;
