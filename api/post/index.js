const express = require("express");
const post = express.Router();
const postController = require("./post.ctrl");
const checkLoggedIn = require("../../helper/checkLoggedIn");

post.get("/", postController.list);
post.use("/", checkLoggedIn);
post.post("/", postController.write);
post.post("/:id", postController.read);
post.delete("/:id", postController.remove);
post.patch("/:id", postController.update);

module.exports = post;
