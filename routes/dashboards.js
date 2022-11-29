var express = require('express');
var router = express.Router();
var dashboardsCtrl = require('../controllers/dashboards')

/* GET users listing. */
router.get('/', dashboardsCtrl.index);
router.get('/:id', dashboardsCtrl.show)
router.post('/', dashboardsCtrl.create)


// OAuth logout route
router.get('/logout', dashboardsCtrl.logout);

module.exports = router;
