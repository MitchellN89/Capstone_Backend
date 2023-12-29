function accountTypeChecker(authorisedAccount) {
  return function (req, res, next) {
    const { accountType } = req;
    console.log(
      `AccountTypeChecker Run: Auth=${authorisedAccount}, User=${accountType}`
    );
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