require('dotenv').config();
const express = require('express');
const passport = require('passport');
require('./config/passportGoogle');
require('./config/passportApple');

const app = express();

app.use(express.json());

// Auth routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const tourRoutes = require('./routes/tourRoutes');

app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/tours', tourRoutes);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
