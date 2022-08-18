/**
 * Configure defaults values to sails io object
 */
import { Promise } from "bluebird";

var io = require("sails.io.js")(require("socket.io-client"));
io.sails.url = process.env.VUE_APP_ROOT_API;

// options to promisify socket functions
const methodNamesToPromisify = ["get", "post", "put", "delete", "request"];
function noErrPromisifier(originalFunction) {
  return function promisified() {
    var args = [].slice.call(arguments);
    var self = this;
    // eslint-disable-next-line no-unused-vars
    return new Promise(function (resolve, _reject) {
      args.push(resolve);
      originalFunction.apply(self, args);
    });
  };
}

// promisify designed socket functions
io.socket = Promise.promisifyAll(io.socket, {
  multiArgs: true,
  filter: function (name) {
    return methodNamesToPromisify.indexOf(name) > -1;
  },
  promisifier: noErrPromisifier,
});

export default io;
