const Joi = require("@hapi/joi");

const candidate = Joi.object({
  title: Joi.string().required(),
  description: Joi.string()
});

const candidates = Joi.array()
  .items(candidate)
  .min(2);

const config = Joi.object({
  name: Joi.string().required(),
  budget: Joi.number()
    .integer()
    .min(1)
    .required()
});

const electionInput = Joi.object({
  owner: Joi.string().required(),
  config: config.required(),
  candidates: candidates.required()
});

const vote = Joi.object({
  candidate: Joi.number()
    .integer()
    .min(0)
    .required(),
  vote: Joi.number()
    .integer()
    .min(0)
    .required()
});

const voteInput = Joi.object({
  user: Joi.string().required(),
  election: Joi.string().required(),
  votes: Joi.array().items(vote)
});

const validateElectionInput = input => Joi.assert(input, electionInput);
const validateVoteInput = input => Joi.assert(input, voteInput);

module.exports = { validateElectionInput, validateVoteInput };
