const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');

 
const app = express();
 
// Initialize Passport and session
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
 
// Replace these values with your Facebook App credentials
const FACEBOOK_APP_ID = '1160244488724395';
const FACEBOOK_APP_SECRET = '3a7e282ed4f95a1b59940ac97f07593d';
const FACEBOOK_CALLBACK_URL = 'http://localhost:3000/auth/facebook/callback';
 
// Passport Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'displayName', 'photos', 'email'],
},
(accessToken, refreshToken, profile, done) => {
  console.log('Facebook authentication callback started');
  console.log('accessToken:', accessToken);
  console.log('refreshToken:', refreshToken);
  console.log('profile:', profile);
  return done(null, profile);
}));
 
// Serialize user to session
passport.serializeUser((user, done) => {
  console.log('Serializing user:', user);
  done(null, user);
});
 
passport.deserializeUser((obj, done) => {
  console.log('Deserializing user:', obj);
  done(null, obj);
});
 
// Set up routes
app.get('/', (req, res) => {
  console.log('Received request at /');
  res.send('<h1>Home Page</h1><a href="/auth/facebook">Login with Facebook</a>');
});
 
app.get('/auth/facebook', passport.authenticate('facebook'));
 
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/profile', failureRedirect: '/' }),
  (req, res) => {
    if (req.isAuthenticated()) {
      console.log('Facebook authentication successful');
    } else {
      console.log('Facebook authentication failed');
    }
  });
 
app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    console.log('User is authenticated:', user);
    res.send(`<h1>Hello, ${user.displayName}</h1><img src="${user.photos[0].value}" /><a href="/logout">Logout</a>`);
  } else {
    console.log('User is not authenticated');
    res.redirect('/');
  }
});
 
app.get('/logout', (req, res) => {
    req.logout(function(err) {
      if (err) {
        console.error('Error during logout:', err);
        return res.redirect('/');
      }
      console.log('User logged out');
      res.redirect('/');
    });
  });
 
 
// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});