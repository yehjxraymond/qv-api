const uuid = require("uuid/v4");
const db = require("../db");
const { successResult, expiryDate } = require("./utils");
const { DB_ELECTION_TABLE_NAME } = require("../config");
const { validateElectionInput } = require("../validator");

const formatNewElection = election => {
  validateElectionInput(election);
  const id = uuid();
  const newElection = { ...election, id, ttl: expiryDate() };
  if (newElection.config.invite) {
    newElection.config.invite = newElection.config.invite.map(invite => ({
      name: invite.name,
      email: invite.email,
      voterId: uuid()
    }));
  }
  return newElection;
};

const postElectionHandler = async event => {
  const body = JSON.parse(event.body);
  const election = formatNewElection(body);
  await db
    .put({
      TableName: DB_ELECTION_TABLE_NAME,
      Item: election
    })
    .promise();
  return successResult(election);
};

module.exports = {
  formatNewElection,
  postElectionHandler
};
