var router = require('express').Router();
var incomesCtrl = require('../controllers/incomes')

router.get('/dashboards/:dId/incomes/:iId', incomesCtrl.show)
router.post('/dashboards/:id/incomes', incomesCtrl.create)
router.delete('/dashboards/:dId/incomes/:iId', incomesCtrl.delete)



module.exports = router;
