# email-serverless

Tiny serverless email application modified for Gmail with Auth2.0. Node-mailer is the only dependency. Only 460Kb! Built to run on AWS Lambda with API Gateway. Abstracts email service from client-side without using third-party services. Key security is handled by Lambda.

Adapted from https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1

Check the link above to create the **required** Google project to access your email. The tutorial goes through creating the neccesary Client_ID, Secret_Key, and Refresh_Token.

# Local Test

To test locally, either use a .env file or manually input API keys into code. Be careful not to commit or you risk exposing your keys to the internet.

Switch to Lambda branch for deployment code.