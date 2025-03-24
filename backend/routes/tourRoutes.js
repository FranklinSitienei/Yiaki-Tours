const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const toursController = require('../controllers/toursController');
const commentsController = require('../controllers/commentsController');
const repliesController = require('../controllers/repliesController');

const router = express.Router();

// Tours Routes
router.get('/', toursController.getAllTours);
router.get('/:id', toursController.getTourById);
router.post('/:id/book', authMiddleware, toursController.bookTour);
router.post('/', adminMiddleware, toursController.createTour);
router.put('/:id', adminMiddleware, toursController.updateTour);
router.delete('/:id', adminMiddleware, toursController.deleteTour);

// Comments Routes
router.post('/:tourId/comments', authMiddleware, commentsController.createComment);
router.get('/:tourId/comments', commentsController.getComments);
router.delete('/comments/:commentId', authMiddleware, commentsController.deleteComment);

// Replies Routes
router.post('/comments/:commentId/replies', authMiddleware, repliesController.createReply);
router.get('/comments/:commentId/replies', repliesController.getReplies);
router.delete('/replies/:replyId', adminMiddleware, repliesController.deleteReply);

module.exports = router;
