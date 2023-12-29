const bcrypt = require("bcrypt");

// I've opted to use a hasher for a little extra password security

class Hasher {
  // create hashed password to store in db
  hash(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  // compare given password against hashed password to see if it matches
  compare(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

module.exports = Hasher;
