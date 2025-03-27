const Reply = require('../models/reply');
const User = require('../models/user');

const repliesController = {
  async createReply(req, res) {
    try {
      const reply = await Reply.create({
        commentId: req.params.commentId,
        userId: req.user.id,
        content: req.body.content,
      });
      res.status(201).json(reply);
    } catch (err) {
      res.status(500).json({ message: 'Error creating reply', error: err.message });
    }
  },

  async getReplies(req, res) {
    try {
      const replies = await Reply.findAll({
        where: { commentId: req.params.commentId },
        include: [{ model: User, attributes: ['id', 'name', 'role'] }],
      });
      res.json(replies);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching replies', error: err.message });
    }
  },

  async deleteReply(req, res) {
    try {
      const result = await Reply.destroy({ where: { id: req.params.replyId } });
      res.json({ message: "Reply deleted", result });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting reply', error: err.message });
    }
  },
};

module.exports = repliesController;
