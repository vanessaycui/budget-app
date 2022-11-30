var express = require('express');
var router = express.Router();
var dashboardsCtrl = require('../controllers/dashboards')
// OAuth logout route
router.get('/logout', dashboardsCtrl.logout);
/* GET users listing. */
router.get('/', dashboardsCtrl.index);
router.get('/:id', dashboardsCtrl.show)
router.delete('/:id', dashboardsCtrl.delete)
router.put('/:id', dashboardsCtrl.update)
router.post('/', dashboardsCtrl.create)





module.exports = router;
