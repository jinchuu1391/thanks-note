const crypto = require("crypto");
require("dotenv").config();

function passwordHash(password) {
  let result = password;
  let shasum = crypto.createHash("sha512", process.env.SALT);
  shasum.update(result);
  result = shasum.digest("hex");
  return result;
}

module.exports = passwordHash;
