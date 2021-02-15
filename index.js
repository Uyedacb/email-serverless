const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const {}
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "Your ClientID ", // ClientID
  "Your Client Secret Here", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: "Your Refresh Token Here"
});
const accessToken = oauth2Client.getAccessToken()