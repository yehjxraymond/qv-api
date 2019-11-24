require("dotenv").config();
const useMiddleware = require("./utils/middleware");
const { postElectionHandler } = require("./handlers/postElection");
const { getElectionHandler } = require("./handlers/getElection");
const { postVoteHandler } = require("./handlers/postVote");

module.exports.postElection = useMiddleware(postElectionHandler);
module.exports.getElection = useMiddleware(getElectionHandler);
module.exports.postVote = useMiddleware(postVoteHandler);
