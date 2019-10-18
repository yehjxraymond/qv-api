const middy = require("middy");
const { cors } = require("middy/middlewares");

const errorWrapper = fn => async (...args) => {
  try {
    return await fn(...args);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error })
    };
  }
};

const useMiddleware = fn => middy(errorWrapper(fn)).use(cors());

module.exports = useMiddleware;
