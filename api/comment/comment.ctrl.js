const db = require("../../models");

module.exports = {
  write: (request, response) => {
    response.status(200).send("comment ctrl");
  },
  remove: (request, response) => {},
  update: (request, response) => {},
};
