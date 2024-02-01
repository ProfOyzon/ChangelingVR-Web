import nodemailer from "nodemailer";
import { MAIL_EMAIL, MAIL_PASS } from "$env/static/private";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: MAIL_EMAIL,
        pass: MAIL_PASS
    }
})

// verify connection configuration
transporter.verify( (error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
