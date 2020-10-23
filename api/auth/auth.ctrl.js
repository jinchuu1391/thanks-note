const db = require("../../models");
const cryto = require("crypto");
require("dotenv").config();

module.exports = {
  signup: (request, response) => {
    response.status(200).send("success");
  },

  signin: (request, response) => {},

  signout: (request, response) => {},

  mypage: (request, response) => {},

  updateMypage: (request, response) => {},
};
