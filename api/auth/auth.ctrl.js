const db = require("../../models");
const crypto = require("crypto");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  signup: (request, response) => {
    // username, password, email, profile_photo_url
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
    const password = request.body.password;
    const shasum = crypto.createHash("sha512", process.env.SALT);
    shasum.update(password);
    paswword = shasum.digest("hex");

    db.User.findOrCreate({
      where: { email: request.body.email },
      defaults: {
        username: request.body.username,
        password: paswword,
      },
    })
      .then(([result, created]) => {
        if (!created) {
          return response.status(409).send("존재하는 아이디 입니다");
        }
        let token = jwt.sign(
          {
            email: request.body.email,
            id: result.id,
          },
          process.env.TOKEN_KEY
        );
        response.status(201);
        response.cookie("access-token", token, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        });
        response.send("회원가입 성공");
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  },

  signin: (request, response) => {},

  signout: (request, response) => {},

  mypage: (request, response) => {},

  updateMypage: (request, response) => {},
};
