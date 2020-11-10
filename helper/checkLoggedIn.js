const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkLoggedIn = (request, response, next) => {
  // 토큰을 검증하고 로그인 여부를 확인하는 미들웨어
  const token = request.body["token"];
  if (!token) {
    response.status(401).send("로그인이 필요합니다");
  }
  try {
    let decoded = jwt.verify(token, process.env.TOKEN_KEY);
    request.decoded = decoded;
    next();
  } catch (error) {
    response.status(401).send("토큰에러!");
  }
};
module.exports = checkLoggedIn;
