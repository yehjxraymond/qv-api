const uuid = require("uuid/v4");
const db = require("../db");
const { successResult, expiryDate } = require("./utils");
const { DB_ELECTION_TABLE_NAME } = require("../config");
const { validateElectionInput } = require("../validator");
const sendMail = require("../mailer");

const formatNewElection = election => {
  validateElectionInput(election);
  const id = uuid();
  if (!election.config.private && election.config.invite)
    throw new Error("Public elections cannot have invite list");
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

const processEmails = election => {
  if (
    !election.config.private ||
    !election.config.notifyInvites ||
    !election.config.invite
  )
    return;
  election.config.invite.forEach(invitee => {
    sendMail({
      to: invitee.email,
      name: invitee.name,
      title: election.config.name,
      uuid: election.id,
      path: `/vote?election=${election.id}&userId=${invitee.voterId}`
    });
  });
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
  processEmails(election);
  return successResult(election);
};

module.exports = {
  formatNewElection,
  postElectionHandler
};
