const User = require('./user');
const Tour = require('./tour');
const Like = require('./like');
const Bookmark = require('./bookmark');
const Rating = require('./rating');

// Likes
User.belongsToMany(Tour, { through: Like, as: 'LikedTours', foreignKey: 'userId' });
Tour.belongsToMany(User, { through: Like, as: 'LikedBy', foreignKey: 'tourId' });

// Bookmarks
User.belongsToMany(Tour, { through: Bookmark, as: 'BookmarkedTours', foreignKey: 'userId' });
Tour.belongsToMany(User, { through: Bookmark, as: 'BookmarkedBy', foreignKey: 'tourId' });

// Ratings
User.belongsToMany(Tour, { through: Rating, as: 'RatedTours', foreignKey: 'userId' });
Tour.belongsToMany(User, { through: Rating, as: 'RatedBy', foreignKey: 'tourId' });
