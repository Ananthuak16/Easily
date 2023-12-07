

// emailService.js

import nodemailer from "nodemailer";
import readline from "readline";

const Mailer = (userMail, applicantName) => {
  const cout = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Create a transporter object with SMTP details
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ananthuak97@gmail.com",
      pass: "vbyvwetqpldbxmus",
    },
  });

  // Define mail options with the provided recipient email and applicant name
  let mailOptions = {
    from: "ananthuak97@gmail.com",
    to: userMail,
    text: `Dear ${applicantName},\n\n` +
      'Thank you for applying to a job at Easily. We have received your application and are currently reviewing it. ' +
      'If your qualifications match our requirements, we will contact you for the next steps of the selection process. ' +
      'Thank you for your interest in joining our team!\n\n' +
      'Best regards,\nThe Easily Team',
    subject: "Job Application Confirmation",
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Success: Email sent to ${userMail}`);
    }
  });

  cout.close();
};

export default Mailer;
