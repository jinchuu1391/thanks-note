const db = require("../../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const passwordHash = require("../../helper/passwordHash");
const generateToken = require("../../helper/generateToken");

module.exports = {
  signup: (request, response) => {
    const requestBodyKeys = Object.keys(request.body);
    const neccessaryKeys = ["username", "password", "email"];
    for (let i = 0; i < neccessaryKeys.length; i++) {
      if (requestBodyKeys.includes(neccessaryKeys[i]) === false) {
        return response.status(400).send("bad request");
      }
    }
    const requestBodyValues = Object.values(request.body);
    for (let i = 0; i < requestBodyValues.length; i++) {
      if (requestBodyValues[i] === "") {
        return response.status(400).send("bad request");
      }
    }

    db.User.findOrCreate({
      where: { email: request.body.email },
      defaults: {
        username: request.body.username,
        password: passwordHash(request.body.password),
      },
    })
      .then(([result, created]) => {
        if (!created) {
          response.status(409).send("존재하는 아이디 입니다");
        }
        const token = generateToken(request.body.email, result.id);
        response.status(201);
        response.cookie("access-token", token, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        });
        response.send("회원가입 성공");
      })
      .catch((error) => {
        response.status(500).send(error);
      });
  },

  signin: (request, response) => {
    db.User.findOne({ where: { email: request.body.email } })
      .then((user) => {
        if (!user) {
          response.status(401).send("계정이 없습니다");
        }
        if (user.password === passwordHash(request.body.password)) {
          let token = generateToken(request.body.email, user.id);
          response.status(200);
          response.cookie("access-token", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
          });
          response.send("로그인 성공");
        } else {
          response.status(401).send("잘못된 정보 입니다");
        }
      })
      .catch((error) => response.status(500).send(error));
  },

  signout: (request, response) => {},

  mypage: (request, response) => {},

  updateMypage: (request, response) => {},
};
