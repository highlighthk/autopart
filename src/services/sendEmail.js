
const nodemailer = require('nodemailer');
const {smtpport, smtphost, user, pass} = require('../config');
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

 const sendEmail = async ({
  buyerEmail_customer,
  buyerEmail_me,
  subject,
  text,
  template
}) => {
  try {
    const transporter = nodemailer.createTransport({
      port: parseInt(smtpport || ''),
      host: smtphost,
      secure: true,
      auth: {
        user: user,
        pass: pass,
      },
    });

    const emailTemplate = fs.readFileSync(path.join(__dirname, "..",'templates/reply.ejs'), "utf-8");
    const compiledTemplate = ejs.compile(emailTemplate);

     await transporter.sendMail({
      from:"info@autoparthouse.net",
      to: buyerEmail_customer,
　　bcc: buyerEmail_me,
      subject: subject, 
      html: template ? compiledTemplate : "",
      text: text,
    });
    //await transporter.sendMail({
      //from:"info@autoparthouse.net",
      //to: buyerEmail_me,
      //subject: subject, 
      //html: template ? compiledTemplate : "",
      //text: text,
    //});
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = {
    sendEmail
};