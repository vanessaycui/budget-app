var router = require('express').Router();
var incomesCtrl = require('../controllers/incomes')


router.post('/dashboards/:id/incomes', incomesCtrl.create)

module.exports = router;
