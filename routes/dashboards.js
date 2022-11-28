var express = require('express');
var router = express.Router();
var dashboardsCtrl = require('../controllers/dashboards')

/* GET users listing. */
router.get('/', dashboardsCtrl.index);
// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function(err){
    res.redirect('/');
  });
});

module.exports = router;
