const AWS = require("aws-sdk");

const options = process.env.IS_OFFLINE
  ? {
      region: "localhost",
      endpoint: "http://localhost:8000",
      accessKeyId: "MOCK_ACCESS_KEY_ID",
      secretAccessKey: "MOCK_SECRET_ACCESS_KEY",
      convertEmptyValues: true
    }
  : { convertEmptyValues: true };
const dynamoClient = new AWS.DynamoDB.DocumentClient(options);

module.exports = dynamoClient;
