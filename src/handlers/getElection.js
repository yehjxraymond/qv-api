const { pick, get } = require("lodash");
const db = require("../db");
const { successResult, isVoter } = require("./utils");
const { DB_ELECTION_TABLE_NAME, DB_VOTE_TABLE_NAME } = require("../config");

const sanitiseOutput = (election, requestor) => {
  if (requestor === election.owner || !election.config.private)
    return pick(election, ["candidates", "id", "ttl", "config", "votes"]);
  if (isVoter(election, requestor))
    return {
      id: election.id,
      ttl: election.ttl,
      candidates: election.candidates,
      config: pick(election.config, ["name", "private", "budget", "encryptionKey"])
    };
  throw new Error("You may not view this private election");
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

const getElectionHandler = async event => {
  const requestorId = get(event, "headers.Authorization");
  const { id } = event.pathParameters;
  const election = await getElectionById(id);
  const votes = await getVotesForElection(id);

  // Add vote results
  const output = sanitiseOutput({ ...election, votes }, requestorId);
  return successResult(output);
};

module.exports = {
  sanitiseOutput,
  getElectionHandler,
  getVotesForElection,
  getElectionById
};
