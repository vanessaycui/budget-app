var router = require('express').Router();
const passport = require('passport')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile','email'] }
));

//this is the google callback route after user confirms. 
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    // successRedirect: '/dashboards',
    failureRedirect: '/'
  }
), (req,res)=>{

  res.redirect('/dashboards')

});

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function(err){
    res.redirect('/');
  });
});

module.exports = router;
