const nodemailer = require("nodemailer");
const result = require('dotenv').config();

if (result.error) {
  throw result.error;
}

exports.handler = async function(event) {
  //var messageObj = JSON.parse(event.body);
  messageObj = {sender: "test", email: "test", message: "test"};
  let sender = "<p>From: " + messageObj.sender + "</p>";
  let email = "<p>Email: " + messageObj.email + "</p>";
  let message = messageObj.message;
  const mailOptions = {
    from: "randomemail@email.com",
    to: "randomemail@email.com",
    subject: "Node.js Email with Secure OAuth2.0",
    generateTextFromHTML: true,
    html: sender + email + message
  };
  try {
    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
          type: "OAuth2",
          user: "randomemail@email.com", 
          clientId:  process.env.GOOG_CLIENT_ID,
          clientSecret: process.env.GOOG_SECRET_KEY,
          refreshToken: process.env.GOOG_REFRESH_KEY,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    smtpTransport.sendMail(mailOptions, (error, response) => {
      error ? console.log(error) : console.log(response);
      smtpTransport.close();
    });
    return smtpTransport;
  } catch (e) {
    console.log(e);
  }
}

exports.handler();

