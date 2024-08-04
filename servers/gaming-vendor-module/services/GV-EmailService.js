import nodemailer from "nodemailer";

const sendmail = async (vendor_email, html_text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });

  const mailOptions = {
    from: "Snappcoins <Info@incrivelsoft.com>",
    to: `${vendor_email}`,
    subject: "Welcome to Snappcoins - Successful Signup",
    html: html_text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
};

export default sendmail;