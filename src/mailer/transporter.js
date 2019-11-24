const aws = require("aws-sdk");
const nodemailer = require("nodemailer");
const config = require("../config");

const SES = new aws.SES({
  apiVersion: "2010-12-01",
  accessKeyId: config.SES_ID,
  secretAccessKey: config.SES_SECRET,
  region: config.SES_REGION
});

const sesTransporter = nodemailer.createTransport({ SES });

module.exports = sesTransporter;
