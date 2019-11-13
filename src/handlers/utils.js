const successResult = result => ({
  statusCode: 200,
  body: JSON.stringify(result)
});

const DEFAULT_TTL = 60 * 60 * 24; // 1 day
const expiryDate = () => Math.floor(Date.now() / 1000) + DEFAULT_TTL;

const isVoter = (election, user) =>
  election.config.invite.some(invited => invited.voterId === user);

module.exports = { successResult, expiryDate, isVoter };
