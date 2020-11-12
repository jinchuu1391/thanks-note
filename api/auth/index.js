const express = require("express");
const auth = express.Router();
const authController = require("./auth.ctrl");
const checkLoggedIn = require("../../helper/checkLoggedIn");
const upload = require("../../helper/imgUpload");

auth.post("/signup", upload.single("img"), authController.signup);
auth.post("/signin", authController.signin);
auth.post("/signout", authController.signout);
auth.use("/", checkLoggedIn);
auth.post("/mypage/:email", authController.mypage);
auth.patch("/mypage", upload.single("img"), authController.updateMypage);

module.exports = auth;
