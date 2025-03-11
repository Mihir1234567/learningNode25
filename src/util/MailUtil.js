const mailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "eadvertisement9@gmail.com",
      pass: "fhqi irvo omfv rrhv",
    },
  });
  const mailOptions = {
    from: "",
    to: to,
    subject: subject,
    html: "<h1>" + text + "</h1>",
  };
  const mailResponse = await transporter.sendMail(mailOptions);
  console.log(mailOptions);
  return mailOptions;
};
module.exports = { sendMail };
