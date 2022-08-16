/**
 * Configure defaults values to sails io object
 */
var io = require("sails.io.js")(require("socket.io-client"));
io.sails.url = process.env.VUE_APP_ROOT_API;

export default io;
