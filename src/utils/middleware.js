const middy = require("middy");
const { cors } = require("middy/middlewares");

const useMiddleware = fn => middy(fn).use(cors());

module.exports = useMiddleware;
