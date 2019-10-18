const uuid = require("uuid/v4");
const useMiddleware = require("./utils/middleware");
const { TABLE_NAME } = require("./config");
const db = require("./db");

const successResult = result => ({
  statusCode: 200,
  body: JSON.stringify(result)
});

const createElection = async event => {
  const body = JSON.parse(event.body);
  const id = uuid();
  // TODO Add validator
  await db
    .put({
      TableName: TABLE_NAME,
      Item: {
        id,
        ...body
        // TODO Add ttl
      }
    })
    .promise();
  return successResult({ id });
};

module.exports.createElection = useMiddleware(createElection);

const getElection = async event => {
  const { id } = event.pathParameters;
  const document = await db
    .get({
      TableName: TABLE_NAME,
      Key: {
        id
      }
    })
    .promise();
  return successResult(document.Item);
};

module.exports.getElection = useMiddleware(getElection);

