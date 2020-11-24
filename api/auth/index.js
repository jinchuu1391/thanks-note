const express = require("express");
const auth = express.Router();
const authController = require("./auth.ctrl");
const checkLoggedIn = require("../../helper/checkLoggedIn");
const upload = require("../../helper/imgUpload");

auth.post("/signup", upload.single("img"), authController.signup);
auth.post("/signin", authController.signin);
auth.post("/signout", authController.signout);
auth.post("/mypage/:email", checkLoggedIn, authController.mypage);
auth.post(
  "/profileupdate",
  upload.single("img"),
  checkLoggedIn,
  authController.updateMypage
);

module.exports = auth;
