var router = require('express').Router();
const passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

//this is the google callback route after user confirms. 
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/dashboards',
    failureRedirect: '/dashboards'
  }
));


module.exports = router;
