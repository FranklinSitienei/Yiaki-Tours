const { Comment } = require('../models/comment');

const commentsController = {
  // Create a comment
  async createComment(req, res) {
    try {
      const { content } = req.body;
      const { tourId } = req.params;
      const userId = req.user.id;

      const newComment = await Comment.create({ content, tourId, userId });
      res.status(201).json(newComment);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create comment', error: err.message });
    }
  },

  // Get comments for a specific tour
  async getComments(req, res) {
    try {
      const { tourId } = req.params;
      const comments = await Comment.findAll({ where: { tourId } });
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch comments', error: err.message });
    }
  },

  // Delete a comment (by the user who created it)
  async deleteComment(req, res) {
    try {
      const { commentId } = req.params;
      const userId = req.user.id;

      const comment = await Comment.findByPk(commentId);
      if (!comment) return res.status(404).json({ message: 'Comment not found' });
      if (comment.userId !== userId) return res.status(403).json({ message: 'Unauthorized' });

      await comment.destroy();
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete comment', error: err.message });
    }
  },
};

module.exports = commentsController;
