const config = require("../config");
const mailer = transporter => ({ to, title, path }) => {
  const link = config.BASE_URL + path
  return transporter.sendMail({
    from: config.SENDING_EMAIL,
    to,
    subject: `You're invited to vote in: ${title}`,
    text: `You're invited to vote: ${link}`,
    html: `You're invited to vote: <a href=${link}>${link}</a>`
  });
};

module.exports = mailer;
