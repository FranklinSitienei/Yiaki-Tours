const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING, // Will be hashed when stored
  },
  googleId: {
    type: DataTypes.STRING, // For Google OAuth
  },
  appleId: {
    type: DataTypes.STRING, // For Apple OAuth
  },
  avatar: {
    type: DataTypes.STRING, // image URL or base64 string
    allowNull: true,
  },
  homeAddress: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = User;
