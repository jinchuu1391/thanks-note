const { response } = require("express");
const db = require("../../models");

module.exports = {
  write: (request, response) => {
    const { title, content } = request.body;
    db.Content.create({
      title: request.body.title,
      content: request.body.content,
      userId: request.decoded.id,
    })
      .then((post) => {
        response.status(201).json({ id: post.id });
      })
      .catch((error) => {
        response.status(500).send(error);
      });
  },
  list: (request, response) => {
    db.Content.findAll()
      .then((allContents) => {
        response.status(200).json(allContents);
      })
      .catch((error) => {
        response.status(500).send(error);
      });
  },
  read: (request, response) => {},
  remove: (request, response) => {},
  update: (request, response) => {},
};
