const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Like = sequelize.define('TourLike', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tourId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  uniqueKeys: {
    actions_unique: {
      fields: ['userId', 'tourId']
    }
  }
});

module.exports = Like;
