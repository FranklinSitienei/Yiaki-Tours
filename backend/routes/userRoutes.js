const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', authMiddleware, registerUser);
router.post('/login', loginUser);

module.exports = router;
