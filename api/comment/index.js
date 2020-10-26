const express = require("express");
const comment = express.Router();
const commentController = require("./comment.ctrl");
const checkLoggedIn = require("../../helper/checkLoggedIn");

comment.use("/", checkLoggedIn);
comment.post("/", commentController.write);
comment.delete("/", commentController.remove);
comment.patch("/", commentController.update);

module.exports = comment;
