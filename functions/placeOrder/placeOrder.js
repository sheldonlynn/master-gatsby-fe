const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your Recent Order for ${total}</h2>
    <p>Your order will be ready in 20 mins.</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
              <img src="${item.thumbnail}" alt="${item.name}" />
              ${item.size} ${item.name} - ${item.price}
            </li>`
        )
        .join('')}
    </ul>
    <p>Your total is <strong>${total}</strong> due at pickup</p>
    <style>
      ul {
        list-style: none;
      }
    </style>
  </div>`;
}

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

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  // await wait(5000);
  const body = JSON.parse(event.body);
  // check if they have filled out honeypot
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'BOT BOT BOT ERR 3554325' }),
    };
  }
  // validate data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `You are missing the ${field} field` }),
      };
    }
  }

  // make sure they actually have items in the order

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `You're ordering nothing...` }),
    };
  }

  // send the email
  // send success or error message

  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
