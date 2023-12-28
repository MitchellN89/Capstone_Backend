const Models = require("../models");
const { use } = require("../routes/authRoutes");
const { Hasher, Token, DataFormatter } = require("../utilities");
const { Op } = require("sequelize");

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
    const existingAccount = await this.#getUserByEmailAndAccountType(
      emailAddress,
      accountType
    );

    // if the user is found as below...
    if (existingAccount)
      return {
        _conflict: true,
        response: "User already exists in the database",
        // sending back the accountType and emailAddress so the front end can refer the user to the correct page.
        data: {
          accountType: body.accountType,
          emailAddress: body.emailAddress,
        },
      };

    // now creating a new user using the req body
    const newUser = await this.#createUser(body);
    // returns an object of the new user and specifies that conflict is false
    return {
      conflict: false,
      response: "Successfully created new user",
      data: newUser,
    };
  }

  async #getUserByEmailAndAccountType(emailAddress, accountType) {
    // This function looks for he user by emailAddres and accountType
    // Returns a promise which resolves to null or the user found
    return Models.User.findOne({
      where: { emailAddress, accountType },
    });
    // I've made this a private function as it returns the entire user including the password
  }

  async #createUser(body) {
    const { password } = body;
    // take the password and hash it for in-db-security
    const hashedPassword = await this.#hasher.hash(password);

    // while this function creates a new user, it doesn't try to handle existing users in the db. This is handled in other functions such as checkAndCreateUser
    // the hashedPassword is passed in to be stored in MySQL
    const newUser = await Models.User.create({
      ...body,
      password: hashedPassword,
    });

    // returning the basic credentitals for the user to sign in with their new account
    return {
      emailAddress: newUser.emailAddress,
      accountType: newUser.accountType,
    };
  }

  async loginWithCredentials(body) {
    const { emailAddress, accountType, password } = body;
    // first, find the user
    const foundUser = await this.#getUserByEmailAndAccountType(
      emailAddress,
      accountType
    );

    // if the user doesn't exist, let the front end know
    if (!foundUser)
      return {
        _userExists: false,
        _credentialsMatch: false,
        response: "Cannot find user which matches entered credentials",
      };

    const { password: hashedPassword } = foundUser;
    // get the hashed password
    // compare the users login password with the hashed password
    const _credentialsMatch = await this.#hasher.compare(
      password,
      hashedPassword
    );

    // if it's not a match, let the front end know
    if (!_credentialsMatch)
      return {
        _userExists: true,
        _credentialsMatch,
        response: "Cannot find user which matches entered credentials",
      };

    // if it IS a match, let the front end know and send back the user with the token
    const userToken = this.token.sign(foundUser);

    // TODO - Possibly remove omit tool?

    let userAccount;

    if (foundUser.accountType === "eventPlanner") {
      userAccount = await this.#getEventPlannerAccountById(foundUser.id);
    } else if (foundUser.accountType === "vendor") {
      // userAccount = //TODO - need to make getVendorAccountById
    }

    // return the instructions to the controller
    return {
      _userExists: true,
      _credentialsMatch,
      response: "Successfully found user",
      data: userAccount,
      token: userToken,
    };
  }

  async #getEventPlannerAccountById(id) {
    const user = await Models.User.findByPk(id, {
      include: [
        {
          model: Models.Event,
          include: [{ model: Models.EventService }],
          where: { archived: false },
          required: false,
        },
      ],
    });
    console.log("FOUNC USER:", user);
    return user;
  }
}

module.exports = UserServices;
