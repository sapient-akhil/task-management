const nodemailer = require("nodemailer");
const path = require("path");

module.exports = {
  sendEmail: async (email, subject, html) => {
    return new Promise(async (resolve) => {
      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_AUTH_USER,
          pass: process.env.EMAIL_AUTH_PASS,
        },
      });
      var mailOptions = {
        from: "test.user25112020@gmail.com",
        to: email,
        subject: subject,
        html: html,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error" + error);
          return resolve({
            status: false,
            data: [],
            message: "Could not send Email!",
          });
        }
        console.log("info " + info);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return resolve({ status: true, data: [], message: "OTP sent!." });
      });
    });
  },
};
