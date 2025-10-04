// api/index.js
const app = require("../app"); // import your express app
const serverless = require("serverless-http");

module.exports = serverless(app);