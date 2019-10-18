const uuid = require("uuid/v4");
const useMiddleware = require("./utils/middleware");
const { DB_ELECTION_TABLE_NAME, DB_VOTE_TABLE_NAME } = require("./config");
const db = require("./db");

const successResult = result => ({
  statusCode: 200,
  body: JSON.stringify(result)
});

const postElection = async event => {
  const body = JSON.parse(event.body);
  const id = uuid();
  // TODO Add validator
  await db
    .put({
      TableName: DB_ELECTION_TABLE_NAME,
      Item: {
        id,
        ...body
        // TODO Add ttl
      }
    })
    .promise();
  // TODO return full election status
  return successResult({ id });
};

module.exports.postElection = useMiddleware(postElection);

const getElection = async event => {
  const { id } = event.pathParameters;
  const document = await db
    .get({
      TableName: DB_ELECTION_TABLE_NAME,
      Key: {
        id
      }
    })
    .promise();
  // TODO add vote status
  return successResult(document.Item);
};

module.exports.getElection = useMiddleware(getElection);

const postVote = async event => {
  const body = JSON.parse(event.body);
  const id = uuid();
  // TODO Add validator
  await db
    .put({
      TableName: DB_VOTE_TABLE_NAME,
      Item: {
        id,
        ...body
        // TODO Add ttl
      }
    })
    .promise();
  // TODO return full election status
  return successResult({ id });
};

module.exports.postVote = useMiddleware(postVote);
