const AWS = require("aws-sdk");

const options = process.env.IS_OFFLINE
  ? {
      region: "localhost",
      endpoint: "http://localhost:8000",
      accessKeyId: "MOCK_ACCESS_KEY_ID",
      secretAccessKey: "MOCK_SECRET_ACCESS_KEY"
    }
  : {};
const dynamoClient = new AWS.DynamoDB.DocumentClient(options);
// const put = (...args) => dynamoClient.put(...args).promise();
// const get = (...args) =>
//   dynamoClient
//     .get(...args)
//     .promise()
//     .then(results => {
//       if (results.Item) {
//         return results.Item;
//       }
//       throw new Error("No Document Found");
//     });
// const remove = (...args) => dynamoClient.delete(...args).promise();

module.exports = dynamoClient;
