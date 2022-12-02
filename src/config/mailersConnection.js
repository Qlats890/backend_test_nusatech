const Nodemailer = require("nodemailer");

const nodemailer = Nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

nodemailer.verify((error, success) => {
  if (error) {
    console.error(error);
  } else {
    console.log("nodemailer berhasil yeay");
  }
});

module.exports = nodemailer;
