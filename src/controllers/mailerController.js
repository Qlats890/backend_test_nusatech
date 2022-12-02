const User = require("../models/userModels");

class MailerController {
  //TODO : Get Email with Pending's status
  /**
   *
   * @param {pending | registered | verified} status
   * @returns array
   */
  static async getEmailDependOnStatus(status) {
    // * Get Email with status Pending
    try {
      const data = await User.findAll({
        attributes: ["email"],
        raw: true,
        where: {
          status,
        },
      });
      // console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }
}

module.exports = MailerController;
