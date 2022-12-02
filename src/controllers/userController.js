const { Op } = require("sequelize");
const db = require("../config/dbConnection");
const { bcryptGenerate, bcryptVerify } = require("../helper/bcrypt");
const {
  jwtSignMailer,
  jwtVerifyMailer,
  jwtGenerate,
} = require("../helper/jwt");
const { SignUp, Verify, SignIn } = require("../interfaces/userInterfaces");
const Mailer = require("../models/mailerModels");
const User = require("../models/userModels");
const Wallet = require("../models/walletModels");

class UserController {
  static async getUserData(req, res) {
    // * email
    const email = res.locals.email;
    try {
      let data = await db.query(
        `SELECT 
        a.email, 
        a.status, 
        b.name, 
        c.balance 
      FROM 
        wallet c 
        JOIN ms_user a ON a.id_user = c."msUserIdUser"
        JOIN currency b ON b.id_currency = c."currencyIdCurrency"
      WHERE 
        a.email = '${email}'
      `
      );
      if (data[0].length === 0) {
        data = await User.findAll({
          attributes: ["email", "createdAt", "updatedAt"],
          where: {
            email,
          },
        });
        res.status(200).json(data[0]);
      } else {
        res.status(200).json(data[0]);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: "Server Error!",
      });
    }
  }
  static async userSignUp(req, res) {
    //*declare variable from request
    const email = req.body.email;
    const pass = req.body.pass;
    const status = "pending";
    //*validation input with interface
    const { stats, result } = SignUp({ email, pass, status });
    // console.log(stats, result);
    //*if invalid input then send error
    if (!stats) res.status(400).json({ data: "400 - Bad Request" });
    //*if valid then go
    try {
      const data = await User.create({
        email: result.email,
        pass: bcryptGenerate(result.pass),
        status,
      });
      // * Add Mailer too
      await Mailer.create({
        userIdUser: data.id_user,
        email: data.email,
        pin: jwtSignMailer(data.id_user, data.email),
        status,
      });
      // * send respons
      res.status(200).json({
        data: "Created new Account success",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        data: "Server Error!",
      });
    }
  }
  static async userSignIn(req, res) {
    // * declare variable from request
    const email = req.body.email;
    const pass = req.body.pass;
    // * validation
    const { stats, result } = SignIn({ email, pass });
    //*if invalid input then send error
    if (!stats) res.status(400).json({ data: "400 - Bad Request" });
    // * if valid then go
    try {
      const data = await User.findAll({
        raw: true,
        attributes: ["email", "pass"],
        where: {
          email: result.email,
        },
      });
      if (data.length === 0) {
        res.status(404).json({
          data: "Email is not registered!",
        });
      } else {
        // * check password
        const checkPass = bcryptVerify(result.pass, data[0].pass);
        if (!checkPass) {
          res.status(401).json({
            data: "Email/Pass is not correct!",
          });
        } else {
          res.status(200).json({
            data: jwtGenerate(data[0].id_user, data[0].email),
          });
        }
      }
    } catch (error) {}
  }

  static async userNotifChangeEmail(req, res) {
    //*declare variable from request
    const email = req.body.email;
    const pass = req.body.pass;
    const status = "pending";
    //*validation input with interface
    const { stats, result } = SignUp({ email, pass, status });
    // console.log(stats, result);
    //*if invalid input then send error
    if (!stats) res.status(400).json({ data: "400 - Bad Request" });
    //*if valid then go
    try {
      const data = await User.findAll({
        raw: true,
        attributes: ["email", "id_user"],
        where: {
          email: result.email,
        },
      });
      // * create mailer to send verification pin
      await Mailer.create({
        userIdUser: data[0].id_user,
        email: data[0].email,
        pin: jwtSignMailer(data[0].id_user, data[0].email),
        status,
      });
      res.status(200).json({
        data: "Notif Change Email Success!",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        data: "Server Error!",
      });
    }
  }

  static async userChangeEmail(req, res) {
    //*declare variable from request
    const email = req.body.email;
    const newEmail = req.body.newEmail;
    const status = "pending";
    //*validation input with interface
    const { stats, result } = SignUp({ email: newEmail, pass: "pass", status });
    // console.log(stats, result);
    //*if invalid input then send error
    if (!stats) res.status(400).json({ data: "400 - Bad Request" });
    //*if valid then go
    try {
      //* change data
      await User.update(
        {
          email: result.email,
          status,
        },
        {
          where: {
            email,
          },
        }
      );
      //* take email and id_user first
      const data = await User.findAll({
        attributes: ["id_user", "email"],
        where: {
          email: result.email,
        },
      });
      // * Add Mailer too
      await Mailer.create({
        userIdUser: data[0].id_user,
        email: data[0].email,
        pin: jwtSignMailer(data[0].id_user, data[0].email),
        status,
      });
      // * send respons
      res.status(200).json({
        data: "Update Account success",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        data: "Server Error!",
      });
    }
  }

  static async verify(req, res) {
    //* declare pin
    const pin = req.params.pin;
    console.log(pin);
    // * validation pin with interface
    const { stats, result } = Verify(pin);
    if (!stats) res.status(400).json({ data: "400 - Bad Request" });
    // * if valid then go
    const { id_user, email } = jwtVerifyMailer(result.pin);
    try {
      // * update user and mailer to verified
      await User.update(
        {
          status: "verified",
        },
        {
          where: {
            id_user,
          },
        }
      );
      await Mailer.update(
        {
          status: "verified",
        },
        {
          where: {
            email,
            [Op.not]: [{ status: "expired" }],
          },
        }
      );
      res.status(200).json({
        data: {
          email,
        },
      });
    } catch (error) {
      res.status(500).json({
        data: "Server Error!",
      });
    }
  }
}

module.exports = UserController;
