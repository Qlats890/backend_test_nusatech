const { jwtVerify } = require("../helper/jwt");

class Auth {
  static jwtCheck(req, res, next) {
    console.log(req.headers["authorization"]);
    const { status, email } = jwtVerify(req.headers["authorization"]);
    if (!status) {
      res.status(403).json({
        data: "Session Time Out!",
      });
    } else {
      res.locals.email = email;
      next();
    }
  }
}
module.exports = Auth;
