function accountTypeChecker(authorisedAccount) {
  return function (req, res, next) {

    // destructure accountType from the req. (TokenChecker stored it there after extracting it from the auth token)
    const { accountType } = req;

    // compare the actual accountType against the authorised account type given.
    // if it's a match, continue on, if it isn't, send back unauthorised response

    if (accountType !== authorisedAccount) {
      return res
        .status(401)
        .json({ response: "User is not authorised to take this action" });
    } else {
      next();
    }
  };
}

module.exports = accountTypeChecker;
