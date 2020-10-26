const { response } = require("express");
const db = require("../../models");

module.exports = {
  write: (request, response) => {
    const { title, content } = request.body;
    db.Content.create({
      title: request.body.title,
      content: request.body.content,
    })
      .then((post) => {
        response.status(201).json({ id: post.id });
      })
      .catch((error) => {
        response.status(500).send(error);
      });
  },
  list: (request, response) => {},
  read: (request, response) => {},
  remove: (request, response) => {},
  update: (request, response) => {},
};
