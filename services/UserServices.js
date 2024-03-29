const Models = require("../models");
const { Hasher, Token, DataFormatter } = require("../utilities");

// Each class creates a class object that is repsonsible for the database manipulations.
// I've opted to keep this logic outside of the controller as a means to further separate concerns.
// These class object functions all receive the params they require to do basic CRUD operations in mysql.
// Whereas the controllers only need to handle arranging the data to send these functions and returning a response to the front end

// The basic structure of each function is the same;
// firstly, the CRUD operation is awaited and the result is stored.
// If errors occur, they are handled within the controller.
// If no errors occur, the class object function returns an object with at least a response message and the data/payload (where applicable)
class UserServices {
  #hasher;

  constructor() {
    this.#hasher = new Hasher();
    this.token = new Token();
    this.dataFormatter = new DataFormatter();
  }

  async checkExistsOrCreateUser(body) {
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
      userAccount = await this.#getVendorAccountById(foundUser.id);
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

  // private function to get the event planner
  async #getEventPlannerAccountById(id) {
    const user = await Models.User.findByPk(id, {
      attributes: [
        "id",
        "firstName",
        "lastName",
        "emailAddress",
        "phoneNumber",
        "companyName",
        "accountType",
      ],
    });

    return user;
  }

  // private function to get the vendor
  async #getVendorAccountById(id) {
    const user = await Models.User.findByPk(id, {
      attributes: [
        "id",
        "firstName",
        "lastName",
        "emailAddress",
        "phoneNumber",
        "companyName",
        "accountType",
      ],
    });
    return user;
  }
}

module.exports = UserServices;
