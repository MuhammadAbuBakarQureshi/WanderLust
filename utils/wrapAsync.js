const ExpressError = require("./ExpressError");

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(new ExpressError(500, err.message)));
  };
}

module.exports = wrapAsync;
