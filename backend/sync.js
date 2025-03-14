const sequelize = require('./config/database');
const User = require('./models/user');
const Tour = require('./models/tour');
const Comment = require('./models/comment');
const Reply = require('./models/reply');

(async () => {
  try {
    await sequelize.sync({ force: true }); // Set `force: true` for development only
    console.log('Database synced successfully!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();
