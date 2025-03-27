const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rating = sequelize.define('TourRating', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tourId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER, // 0-5
    allowNull: false,
    validate: {
      min: 0,
      max: 5
    }
  }
}, {
  timestamps: true,
  uniqueKeys: {
    actions_unique: {
      fields: ['userId', 'tourId']
    }
  }
});

module.exports = Rating;
