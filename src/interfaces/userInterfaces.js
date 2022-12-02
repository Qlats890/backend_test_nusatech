const Joi = require("joi");

class UserInterface {
  static SignUp(obj) {
    const data = Joi.object().keys({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      pass: Joi.string().required(),
      status: Joi.string().valid("pending", "registered", "verified"),
    });
    const result = data.validate({
      email: obj.email,
      pass: obj.pass,
      status: obj.status,
    });
    if (result.error) {
      console.log(result.error);
      return {
        stats: false,
        result: "Fail in User Interface",
      };
    } else {
      return {
        stats: true,
        result: result.value,
      };
    }
  }
  static Verify(pin) {
    const data = Joi.object().keys({
      pin: Joi.string().required(),
    });
    const result = data.validate({ pin });
    if (result.error) {
      console.log(result.error);
      return {
        stats: false,
        result: "Fail in User Interface",
      };
    } else {
      return {
        stats: true,
        result: result.value,
      };
    }
  }
  static SignIn(obj) {
    const data = Joi.object().keys({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      pass: Joi.string().required(),
    });
    const result = data.validate({
      email: obj.email,
      pass: obj.pass,
    });
    if (result.error) {
      console.log(result.error);
      return {
        stats: false,
        result: "Fail in User Interface",
      };
    } else {
      return {
        stats: true,
        result: result.value,
      };
    }
  }
}

module.exports = UserInterface;
