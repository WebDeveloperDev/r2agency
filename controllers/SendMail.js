const nodemailer = require("nodemailer");

const sendMail = async (receiverEmail,msg) => {
  let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  const transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    // port: 587,
    service: "gmail",
    auth: {
        user: 'talk2devendra.solanki@gmail.com',
        pass: 'epfg ekcp umvo mckv'
    }
  });

  let info = await transporter.sendMail({
    from: '"Devendra" <talk2devendra.solanki@gmail.com>',
    to: receiverEmail, // Use receiverEmail argument here
    subject: "Verify your account with looter ",
    html: msg,
  });

  console.log("Message sent: %s", info.messageId);
  return info; // Return the info object instead of using res.json()
};

module.exports = sendMail;
