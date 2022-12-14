const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20")
const User = require('../models/user')

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      scope: ['profile', 'email'],
      state: true
    },
    // verify callback
    async function (accessToken, refreshToken, profile, cb) {
      let user = await User.findOne({ googleId: profile.id })
      if (user) {
        console.log("found user in db")
        return cb(null, user);
      } else {
        console.log("new user! creating new user")
        var newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });
        newUser.save(function (err) {
          if (err){
            console.log("error saving new user")
            return cb(err);
          }
          return cb(null, newUser);
        });
      }
    }
  )
);

//setup session, pass authenticated user data
passport.serializeUser(function(user, done) {
  console.log("serialize user")
    done(null, user.id);
})

//if existing user, return a user to passport to set req.user
passport.deserializeUser(function(id, done) {
  console.log("deserialize user")
  User.findById(id, function(err, user) {
    if (err){
      console.log("error finding and deserializing user")
    }
    done(null, user)
  })
})