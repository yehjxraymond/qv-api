const uuid = require("uuid/v4");
const { DB_ELECTION_TABLE_NAME, DB_VOTE_TABLE_NAME } = require("../config");
const db = require("../db");
const { sumBy } = require("lodash");
const { validateVoteInput } = require("../validator");
const { successResult, isVoter } = require("./utils");

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

const canCastVote = (election, user) => {
  return election.config.private ? isVoter(election, user) : true;
};

const validateVote = (votes, election) => {
  const totalSpentBudget = sumBy(votes, vote => Math.pow(vote.vote, 2));
  if (totalSpentBudget > election.config.budget)
    throw new Error("User exceeds budget");
  const uniqueCandidateSet = new Set(votes.map(vote => vote.candidate));
  if (uniqueCandidateSet.size !== votes.length)
    throw new Error("User submitted duplicated vote for candidate");
  votes.forEach(vote => {
    if (vote.candidate >= election.candidates.length || vote.candidate < 0)
      throw new Error("User voted for candidate outside of range");
  });
};

const postVoteHandler = async event => {
  const body = JSON.parse(event.body);
  const voterId = body.voter;

  // Check vote schema
  validateVoteInput(body);

  // Check that election exist
  const election = await getElectionById(body.election);
  if (!election) throw new Error("Election does not exist");

  // Check vote budget (if votes are not encrypted)
  if (election.config.encryptionKey) {
    if (body.votes) throw new Error("Invalid input 'votes'");
  } else {
    if (body.encryptedVote) throw new Error("Invalid input 'encryptedVote'");
    validateVote(body.votes, election);
  }

  // Check that user can cast vote
  const eligible = canCastVote(election, voterId);
  if (!eligible) throw new Error("User not allowed to vote");

  // Check that user has not casted vote
  const votesByUser = await getElectionVoteByUser(voterId, body.election);
  if (votesByUser.length > 0) throw new Error("User has already voted");

  const id = uuid();

  await db
    .put({
      TableName: DB_VOTE_TABLE_NAME,
      Item: {
        ...body,
        id,
        ttl: election.ttl
      }
    })
    .promise();
  // TODO return full election status
  return successResult({ id });
};

module.exports = { postVoteHandler, canCastVote, validateVote };
