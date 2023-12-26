const Models = require("../models");
const { Hasher, Token, DataFormatter } = require("../utilities");

class UserServices {
  #hasher;

  constructor() {
    this.#hasher = new Hasher();
    this.token = new Token();
    this.dataFormatter = new DataFormatter();
  }

  async checkAndCreateUser(body) {
    // I have a function here which checks if the user already exists before attempting to create a new one
    const { emailAddress, accountType } = body;
    const existingAccount = await this.#findUserByEmailAndAccountType(
      emailAddress,
      accountType
    );

    // if the user is found as below...
    if (existingAccount)
      return {
        conflict: true,
        response: "User already exists in the database",
        // sending back the accountType and emailAddress so the front end can refer the user to the correct page.
        data: {
          accountType: body.accountType,
          emailAddress: body.emailAddress,
        },
      };

    // now creating a new user using the req body
    const newUser = await this.createUser(body);
    // returns an object of the new user and specifies that conflict is false
    return {
      conflict: false,
      response: "Successfully created new user",
      data: newUser,
    };
  }

  async #findUserByEmailAndAccountType(emailAddress, accountType) {
    // This function looks for he user by emailAddres and accountType
    // Returns a promise which resolves to null or the user found
    return Models.User.findOne({
      where: { emailAddress, accountType },
    });
    // I've made this a private function as it returns the entire user including the password
  }

  async createUser(body) {
    const { password } = body;
    // take the password and hash it for in-db-security
    const hashedPassword = await this.#hasher.hash(password);

    // while this function creates a new user, it doesn't try to handle existing users in the db. This is handled in other functions such as checkAndCreateUser
    return Models.User.create({ ...body, password: hashedPassword });
  }

  async logInUser(body) {
    const { emailAddress, accountType, password } = body;
    // first, find the user
    const foundUser = await this.#findUserByEmailAndAccountType(
      emailAddress,
      accountType
    );

    console.log("FOUND USER: ", foundUser);
    // if the user doesn't exist, let the front end know
    if (!foundUser)
      return {
        userExists: false,
        credentialsMatch: false,
        response: "Cannot find user which matches entered credentials",
      };

    const { password: hashedPassword } = foundUser;
    // get the hashed password
    // compare the users login password with the hashed password
    const credentialsMatch = await this.#hasher.compare(
      password,
      hashedPassword
    );

    // if it's not a match, let the front end know
    if (!credentialsMatch)
      return {
        userExists: true,
        credentialsMatch,
        response: "Cannot find user which matches entered credentials",
      };

    // if it IS a match, let the front end know and send back the user with the token
    const userToken = this.token.sign({
      password: foundUser.password,
      accountType: foundUser.accountType,
      emailAddress: foundUser.emailAddress,
    });

    const dataWithoutPassword = this.dataFormatter.omitFields(
      ["password"],
      foundUser
    );

    return {
      userExists: true,
      credentialsMatch,
      response: "Successfully found user",
      data: { ...dataWithoutPassword, token: userToken },
    };
  }
}

module.exports = UserServices;
