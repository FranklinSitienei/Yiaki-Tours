require('dotenv').config();
const express = require('express');
const passport = require('passport');
require('./config/passportGoogle');
require('./config/passportApple');
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes'); 
const adminRoutes = require('./routes/adminRoutes'); 

const app = express();
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
