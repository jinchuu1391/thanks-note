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
    db.Content.findAll({
      attributes: ["id", "title", "createdAt"],
      include: [
        { model: db.User, attributes: ["username", "profile_photo_url", "id"] },
      ],
    })
      .then((allContents) => {
        response.status(200).json(allContents);
      })
      .catch((error) => {
        response.status(500).send(error);
      });
  },
  read: (request, response) => {
    db.Content.findAll({
      where: { id: request.params.id },
      include: [
        {
          model: db.User,
          attributes: ["username", "email", "profile_photo_url"],
        },
        {
          model: db.Comment,
          include: [{ model: db.User, attributes: ["username", "email"] }],
        },
      ],
    }).then((contentInfo) =>
      response.status(200).json({ content: contentInfo })
    );
  },
  remove: (request, response) => {
    db.Content.destroy({
      where: { id: request.body.contentId },
    })
      .then((result) => {
        response.status(204);
      })
      .catch((error) => {
        response.status(500).send(error);
      });
  },
  update: (request, response) => {
    db.Content.update(
      {
        title: request.body.title,
        content: request.body.content,
      },
      { where: { id: request.body.contentId } }
    )
      .then((result) => {
        response.status(200);
      })
      .catch((error) => {
        response.status(500).send(error);
      });
  },
};
