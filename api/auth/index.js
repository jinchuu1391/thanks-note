const express = require("express");
const auth = express.Router();
const authController = require("./auth.ctrl");
const checkLoggedIn = require("../../helper/checkLoggedIn");

auth.post("/signup", authController.signup);
auth.post("/signin", authController.signin);
auth.post("/signout", authController.signout);
auth.use("/", checkLoggedIn);
auth.post("/mypage", authController.mypage);
auth.patch("/mypage", authController.updateMypage);

module.exports = auth;
