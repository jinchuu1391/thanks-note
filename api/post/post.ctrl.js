const { response } = require("express");
const db = require("../../models");

module.exports = {
  write: (request, response) => {
    response.status(200).send("post ctrl");
  },
  list: (request, response) => {},
  read: (request, response) => {},
  remove: (request, response) => {},
  update: (request, response) => {},
};
