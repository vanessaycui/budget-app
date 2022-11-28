var express = require('express');
var router = express.Router();
var dashboardsCtrl = require('../controllers/dashboards')

/* GET users listing. */
router.get('/', dashboardsCtrl.index);


module.exports = router;
