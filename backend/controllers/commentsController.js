const Comment = require('../models/comment');
const Reply = require('../models/reply');
const User = require('../models/user');

const commentsController = {
  async createComment(req, res) {
    try {
      const comment = await Comment.create({
        userId: req.user.id,
        tourId: req.params.tourId,
        content: req.body.content,
      });
      res.status(201).json(comment);
    } catch (err) {
      res.status(500).json({ message: 'Error creating comment', error: err.message });
    }
  },

  async getComments(req, res) {
    try {
      const comments = await Comment.findAll({
        where: { tourId: req.params.tourId },
        include: [
          {
            model: Reply,
            as: 'replies',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'firstName', 'lastName', 'role', 'avatar']
              }
            ]
          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'role', 'avatar']
          }
        ],
        order: [['createdAt', 'DESC']],
      });      
      res.json(comments);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching comments', error: err.message });
    }
  },

  async deleteComment(req, res) {
    try {
      const result = await Comment.destroy({ where: { id: req.params.commentId } });
      res.json({ message: "Comment deleted", result });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting comment', error: err.message });
    }
  },
};

module.exports = commentsController;
