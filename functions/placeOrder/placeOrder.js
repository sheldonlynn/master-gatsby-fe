const nodemailer = require('nodemailer');

// create transport for nodemailer
const transporter = nodemailer.createTransport({
  // auth for transactional email service... postmark? sendgrid?
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  // test sending an email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: 'orders@example.com',
    subject: 'New Order!',
    html: `<p>Your new pizza order is here!</p>`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
