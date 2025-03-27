const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');
const { Op } = require("sequelize");
const User = require('../models/user');
const Tour = require('../models/tour');
const Rating = require('../models/rating');

// Form-based Registration
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, homeAddress, country } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      homeAddress,
      country,
    });

    const token = generateToken({ id: user.id, role: user.role }, process.env.USER_JWT_SECRET);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Form-based Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !user.password) return res.status(404).json({ message: 'User not found or password not set' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken({ id: user.id, role: user.role }, process.env.USER_JWT_SECRET);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get profile/account of the user
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    const user = await User.findByPk(userId, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'avatar'],
      include: [
        {
          model: Tour,
          as: 'BookmarkedTours',
          attributes: ['id'],
          through: { attributes: [] },
        },
        {
          model: Tour,
          as: 'LikedTours',
          attributes: ['id'],
          through: { attributes: [] },
        },
      ],
    });

    if (!user) {
      console.log("No user found!");
      return res.status(404).json({ message: "User not found" });
    }

    const bookmarks = user.BookmarkedTours.map(t => t.id);
    const liked = user.LikedTours.map(t => t.id);

    // ✅ Fetch ratings from Rating model
    const ratingsData = await Rating.findAll({
      where: { userId },
      attributes: ['tourId', 'rating'],
    });

    const ratings = ratingsData.map(r => ({
      tourId: r.tourId,
      rating: r.rating,
    }));

    res.status(200).json({
      user,
      bookmarks,
      bookings: [], // still a placeholder
      liked,
      ratings, // ✅ include in response
    });
  } catch (err) {
    console.error("Error in getProfile:", err);
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
};

// user can update their details
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, email, homeAddress, country } = req.body;

    const updateData = { firstName, lastName, email, homeAddress, country };

    if (req.file) {
      updateData.avatar = `${req.protocol}://${req.get('host')}/uploads/avatars/${req.file.filename}`;
    }

    await User.update(updateData, { where: { id: userId } });

    const updatedUser = await User.findByPk(userId, {
      attributes: ["firstName", "lastName", "email", "avatar", "homeAddress", "country"],
    });

    res.status(200).json({ user: updatedUser, message: "Profile updated" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
};

// Google OAuth Callback
exports.googleAuthCallback = async (req, res) => {
  try {
    const user = req.user;
    const token = generateToken({ id: user.id, role: user.role }, process.env.USER_JWT_SECRET);
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Apple OAuth Callback
exports.appleAuthCallback = async (req, res) => {
  try {
    const user = req.user;
    const token = generateToken({ id: user.id, role: user.role }, process.env.USER_JWT_SECRET);
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
