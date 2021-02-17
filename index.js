const nodemailer = require("nodemailer");

exports.handler = async function(event) {
  //var messageObj = JSON.parse(event.body);
  messageObj = {sender: "test", email: "test", message: "test"};
  let sender = "<p>From: " + messageObj.sender + "</p>";
  let email = "<p>Email: " + messageObj.email + "</p>";
  let message = messageObj.message;
  const mailOptions = {
    from: "randomemail@email.com",
    to: "randomemail@email.com",
    subject: "Node.js Email with Secure OAuth",
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
    // promise wrapped function, must await or Lambda will end process before finished
    await smtpTransport.sendMail(mailOptions);
  } catch (e) {
    console.log(e);
  }
}

