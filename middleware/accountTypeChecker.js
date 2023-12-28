function accountTypeChecker(authorisedAccount) {
  return function (req, res, next) {
    const { accountType } = req;

    if (!accountType === authorisedAccount) {
      return res.status(401).json({ response: "Unauthorised API call" });
    } else {
      next();
    }
  };
}

module.exports = accountTypeChecker;
