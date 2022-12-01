const { SignUp } = require("../interfaces/userInterfaces");
const User = require("../models/userModels");

class UserController {
  static async getAllUserData(req, res) {}
  static async getUserData(req, res) {}
  static async userSignUp(req, res) {
    //*declare variable from request
    const email = req.body.email;
    const pass = req.body.pass;
    const status = "pending";
    //*validation input with interface
    const { stats, result } = SignUp({ email, pass, status });
    console.log(stats, result);
    //*if invalid input then send error
    if (!stats) res.status(400).json({ data: "400 - Bad Request" });
    //*if valid then go
    try {
      const data = await User.create({
        email: result.email,
        pass: result.pass,
        status,
      });
      res.status(200).json({
        data: "Created new Account success",
      });
    } catch (error) {
      res.status(500).json({
        data: "Server Error!",
      });
    }
  }
  static async userSignIn(req, res) {}
}

module.exports = UserController;
