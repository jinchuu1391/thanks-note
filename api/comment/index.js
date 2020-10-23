const express = require("express");
const comment = express.Router();
const commentController = require("./comment.ctrl");

comment.post("/", commentController.write);
comment.delete("/", commentController.remove);
comment.patch("/", commentController.update);

module.exports = comment;
