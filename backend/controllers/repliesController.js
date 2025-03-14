const { Reply } = require('../models/reply');

const repliesController = {
  // Create a reply (users and admins)
  async createReply(req, res) {
    try {
      const { content } = req.body;
      const { commentId } = req.params;
      const userId = req.user?.id || req.admin?.id;
      const role = req.admin ? 'admin' : 'user';

      const newReply = await Reply.create({ content, commentId, userId, role });
      res.status(201).json(newReply);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create reply', error: err.message });
    }
  },

  // Get replies for a specific comment
  async getReplies(req, res) {
    try {
      const { commentId } = req.params;
      const replies = await Reply.findAll({ where: { commentId } });
      res.status(200).json(replies);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch replies', error: err.message });
    }
  },

  // Delete a reply (admin only)
  async deleteReply(req, res) {
    try {
      const { replyId } = req.params;

      const reply = await Reply.findByPk(replyId);
      if (!reply) return res.status(404).json({ message: 'Reply not found' });

      await reply.destroy();
      res.status(200).json({ message: 'Reply deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete reply', error: err.message });
    }
  },
};

module.exports = repliesController;
