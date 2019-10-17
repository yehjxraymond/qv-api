const middy = require("middy");
const { cors } = require("middy/middlewares");

const handleHello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: event
      },
      null,
      2
    )
  };
};

module.exports.hello = middy(handleHello).use(cors());
