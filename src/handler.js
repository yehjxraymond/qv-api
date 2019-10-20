const uuid = require("uuid/v4");
const useMiddleware = require("./utils/middleware");
const { DB_ELECTION_TABLE_NAME, DB_VOTE_TABLE_NAME } = require("./config");
const db = require("./db");
const { validateElectionInput, validateVoteInput } = require("./validator");

const successResult = result => ({
  statusCode: 200,
  body: JSON.stringify(result)
});

const DEFAULT_TTL = 1000 * 60 * 60 * 24; // 1 day
const expiryDate = () => Math.floor(Date.now() / 1000) + DEFAULT_TTL;

const postElection = async event => {
  const body = JSON.parse(event.body);
  validateElectionInput(body);
  const id = uuid();
  await db
    .put({
      TableName: DB_ELECTION_TABLE_NAME,
      Item: {
        id,
        ...body,
        ttl: expiryDate()
      }
    })
    .promise();
  // TODO return full election status
  return successResult({ id });
};

module.exports.postElection = useMiddleware(postElection);

const getVotesForElection = async electionId => {
  const results = await db
    .scan({
      TableName: DB_VOTE_TABLE_NAME,
      FilterExpression: "election = :election",
      ExpressionAttributeValues: {
        ":election": electionId
      }
    })
    .promise();
  return results.Items;
};

const getElectionVoteByUser = async (voterId, electionId) => {
  const results = await db
    .scan({
      TableName: DB_VOTE_TABLE_NAME,
      FilterExpression: "voter = :voterId and election = :electionId",
      ExpressionAttributeValues: {
        ":voterId": voterId,
        ":electionId": electionId
      }
    })
    .promise();
  return results.Items;
};

const getElectionById = async id => {
  const result = await db
    .get({
      TableName: DB_ELECTION_TABLE_NAME,
      Key: {
        id
      }
    })
    .promise();
  return result.Item;
};

const getElection = async event => {
  const { id } = event.pathParameters;
  const election = await getElectionById(id);
  const votes = await getVotesForElection(id);
  
  // Add vote results
  const result = { ...election, votes };
  return successResult(result);
};

module.exports.getElection = useMiddleware(getElection);

const postVote = async event => {
  const body = JSON.parse(event.body);
  validateVoteInput(body);
  const id = uuid();

  // Check that election exist
  const election = await getElectionById(body.election);
  if (!election) throw new Error("Election does not exist");

  // Check that user has not casted vote
  const votesByUser = await getElectionVoteByUser(body.voter, body.election);
  if (votesByUser.length > 0) throw new Error("User has already voted");
  
  // TODO Check vote entry
  await db
    .put({
      TableName: DB_VOTE_TABLE_NAME,
      Item: {
        id,
        ...body,
        ttl: expiryDate()
      }
    })
    .promise();
  // TODO return full election status
  return successResult({ id });
};

module.exports.postVote = useMiddleware(postVote);
