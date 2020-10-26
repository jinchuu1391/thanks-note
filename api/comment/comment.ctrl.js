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
  remove: (request, response) => {
    db.Comment.destroy({
      where: { id: request.body.commentId },
    })
      .then((result) => {
        response.status(204);
      })
      .catch((error) => {
        response.status(500).send(error);
      });
  },
  update: (request, response) => {
    db.Comment.update(
      {
        comment: request.body.comment,
      },
      { where: { id: request.body.commentId } }
    )
      .then((result) => {
        response.status(200).send("댓글 수정 성공");
      })
      .catch((error) => {
        response.status(500).send(error);
      });
  },
};
