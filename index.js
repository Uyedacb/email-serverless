const nodemailer = require("nodemailer");
const got = require('got');

if (result.error) {
  throw result.error;
}

exports.handler = async function(event) {
  var accessToken = "";
  // grab access token from google auth2.0
  try {
    const requestAccess = await got.post('https://oauth2.googleapis.com/token',
      {searchParams:
        {
        client_id: process.env.GOOG_CLIENT_ID,
        client_secret: process.env.GOOG_SECRET_KEY,
        grant_type: "refresh_token",
        refresh_token: process.env.GOOG_REFRESH_KEY
        }
    });
    accessToken = requestAccess.body.access_token;
  } catch (e) {
    console.log(e);
  }
  //var messageObj = JSON.parse(event.body);
  messageObj = {sender: "test", email: "test", message: "test"};
  let sender = "<p>From: " + messageObj.sender + "</p>";
  let email = "<p>Email: " + messageObj.email + "</p>";
  let message = messageObj.message;
  const mailOptions = {
    from: "randomemail@email.com",
    to: "uyedaportfolio@gmail.com",
    subject: "Node.js Email with Secure OAuth",
    generateTextFromHTML: true,
    html: sender + email + message
  };
  // set Auth2.0 variables for Gmail
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "uyedaportfolio@gmail.com", 
         clientId:  process.env.GOOG_CLIENT_ID,
         clientSecret: process.env.GOOG_SECRET_KEY,
         refreshToken: process.env.GOOG_REFRESH_KEY,
         accessToken: accessToken
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
}

exports.handler();

