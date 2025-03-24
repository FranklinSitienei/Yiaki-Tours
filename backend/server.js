require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const passport = require('passport');
require('./config/passportGoogle');
require('./config/passportApple');
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes'); 
const adminRoutes = require('./routes/adminRoutes'); 
const sequelize = require('./config/database');
const Tour = require('./models/tour');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Models synced with the database.');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
})();

const app = express();

// Enable CORS for all origins or specify allowed origins
app.use(cors()); // Allow all origins
// If you want to restrict origins, use:
// app.use(cors({ origin: 'http://localhost:8080' }));

app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/users', userRoutes); 
app.use('/admin', adminRoutes); 
app.use('/tours', tourRoutes);

// Default error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
