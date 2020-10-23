const express = require("express");
const post = express.Router();
const postController = require("./post.ctrl");

post.get("/", postController.list);
post.post("/", postController.write);
post.get("/:id", postController.read);
post.delete("/:id", postController.remove);
post.patch("/:id", postController.update);

module.exports = post;
