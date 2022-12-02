const Cron = require("node-cron");
const { where } = require("sequelize");
const mailerConfig = require("../config/mailersConnection");
const {
  getEmailDependOnStatus,
  getMailerDependOnEmailAndStatus,
} = require("../controllers/mailerController");
const { jwtVerifyMailer } = require("../helper/jwt");
const Mailer = require("../models/mailerModels");
const User = require("../models/userModels");

async function emailVerification(email) {
  try {
    // * checking if pin still valid
    const mailer = await Mailer.findAll({
      raw: true,
      where: {
        status: "pending",
      },
      limit: 1,
    });
    // console.log(process.env.eee);
    const currentUrl = "http://localhost:" + process.env.PORT + "/";
    const pin = mailer[0].pin;

    const mailOption = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<a href=${currentUrl + "v1/verify/" + pin}>click here</a>`,
    };
    await mailerConfig.sendMail(mailOption);
    return {
      status: true,
      data: pin,
    };
  } catch (error) {
    return {
      status: false,
      idMailer: mailer[0].id_mailer,
      data: error,
    };
  }
}

/**
 * TODO :
 * - Get email where is still have Pending status
 * - Send the email
 * - Change status mailer and user to registered
 * - Change Status on User and Mailer is Registered
 * - done
 */

function cronSendVerification() {
  const cronSchedule = Cron.schedule("*/10 * * * * *", async () => {
    console.log("cronjob started");
    try {
      // get email where is still have pending status
      const arrEmail = await getEmailDependOnStatus("pending");
      // get email where is still have mailer pending status
      const arrEmailOnMailer = await getMailerDependOnEmailAndStatus("pending");
      // send the verification
      if (arrEmail.length === 0) {
        console.log("Chill");
      } else {
        for (let i = 0; i < arrEmail.length; i++) {
          const { status, data, idMailer } = await emailVerification(
            arrEmail[i].email
          );
          if (status) {
            const { email } = jwtVerifyMailer(data);
            // console.log(email);
            await Mailer.update(
              {
                status: "registered",
              },
              {
                where: {
                  email,
                },
              }
            );
            await User.update(
              {
                status: "registered",
              },
              {
                where: {
                  email,
                },
              }
            );
          }
        }
      }
      if (arrEmailOnMailer.length === 0) {
        console.log("Chill In Mailer");
      } else if (arrEmail.length === 0 && arrEmailOnMailer.length !== 0) {
        for (let i = 0; i < arrEmailOnMailer.length; i++) {
          const { status, data, idMailer } = await emailVerification(
            arrEmailOnMailer[i].email
          );
          // console.log(data);
          if (status) {
            const { email } = jwtVerifyMailer(data);
            console.log(jwtVerifyMailer(data));
            console.log(email);
            await Mailer.update(
              {
                status: "registered",
              },
              {
                where: {
                  email,
                },
              }
            );
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
  cronSchedule.start();
}
module.exports = cronSendVerification;
