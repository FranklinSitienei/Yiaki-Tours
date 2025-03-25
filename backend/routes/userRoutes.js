const express = require('express');
const passport = require('passport');
const usersController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Form-based auth
router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/profile', authMiddleware, usersController.getProfile);
router.put(
    "/update",
    authMiddleware,
    upload.single("avatarFile"),
    usersController.updateProfile
  );

// Google OAuth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { session: false }), usersController.googleAuthCallback);

// Apple OAuth
router.get('/auth/apple', passport.authenticate('apple'));
router.post('/auth/apple/callback', passport.authenticate('apple', { session: false }), usersController.appleAuthCallback);

module.exports = router;
