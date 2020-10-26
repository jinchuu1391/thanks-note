const db = require("../../models");

module.exports = {
  write: (request, response) => {
    db.Comment.create({
      comment: request.body.comment,
      contentId: request.body.contentId,
      userId: request.decoded.id,
    })
      .then((comment) => {
        response.status(201).json({ id: comment.id });
      })
      .catch((error) => {
        response.status(500).send(error);
      });
  },
  remove: (request, response) => {},
  update: (request, response) => {},
};
