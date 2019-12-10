const nodemailer = require("nodemailer");
const mailer = require("./mailer");

const etherealCreateAccount = () =>
  new Promise((resolve, reject) => {
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        return reject(err);
      }
      return resolve(account);
    });
  });

describe("mailer", () => {
  let account;
  let etherealMailer;

  beforeAll(async () => {
    account = await etherealCreateAccount();
    const etherealTransporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });
    etherealMailer = mailer(etherealTransporter);
  });

  it("sends email", async () => {
    const emailReceipt = await etherealMailer({
      to: account.user,
      name: "Mr Example",
      title: "ABC Nomination",
      path: `/election?election=ELECTION_ID&userId=VOTER_ID`
    });
    const previewUrl = nodemailer.getTestMessageUrl(emailReceipt);
    // eslint-disable-next-line
    console.log(`Preview your message at ${previewUrl}`);
  }, 10000);
});
