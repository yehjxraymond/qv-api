const config = require("../config");
const mailer = transporter => ({ to, title, path, name }) => {
  const link = config.BASE_URL + path;
  return transporter.sendMail({
    from: config.SENDING_EMAIL,
    to,
    subject: `You're invited to vote in: ${title}`,
    text: `
Hi ${name},

You're invited to vote in ${title}.
You may vote at ${link}.
`,
    html: `
<p>
  Hi ${name},
</p>
<p>
  You're invited to vote in ${title}.
</p>
  You may vote at <a href=${link}>${link}</a>.
<p>
  <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${link}" />
</p>
`
  });
};

module.exports = mailer;
