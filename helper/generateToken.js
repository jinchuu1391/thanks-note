const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(mail, id) {
  let token = jwt.sign(
    {
      email: mail,
      id: id,
    },
    process.env.TOKEN_KEY,
    { expiresIn: "7d" }
  );
  return token;
}

module.exports = generateToken;
