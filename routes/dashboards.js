var express = require('express');
var router = express.Router();
var dashboardsCtrl = require('../controllers/dashboards')
// OAuth logout route
router.get('/logout', dashboardsCtrl.logout);
/* GET users listing. */
router.get('/', isLoggedIn,dashboardsCtrl.index);
router.get('/:id', isLoggedIn,dashboardsCtrl.show)
router.delete('/:id', isLoggedIn,dashboardsCtrl.delete)
router.put('/:id', isLoggedIn,dashboardsCtrl.update)
router.post('/', isLoggedIn,dashboardsCtrl.create)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/auth/google')
  }



module.exports = router;
