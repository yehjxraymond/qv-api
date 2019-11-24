const mailer = require("./mailer");
const sesTransporter = require("./transporter");

module.exports = mailer(sesTransporter);
