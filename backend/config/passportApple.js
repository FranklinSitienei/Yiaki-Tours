const passport = require('passport');
const AppleStrategy = require('passport-apple');
const User = require('../models/user');

passport.use(new AppleStrategy({
  clientID: process.env.APPLE_CLIENT_ID,
  teamID: process.env.APPLE_TEAM_ID,
  keyID: process.env.APPLE_KEY_ID,
  privateKey: process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  callbackURL: '/auth/apple/callback',
}, async (idToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ where: { appleId: profile.id } });
    if (!user) {
      user = await User.create({
        name: profile.displayName,
        email: profile.email,
        appleId: profile.id,
      });
    }
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

module.exports = passport;
