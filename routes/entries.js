var router = require('express').Router();
var entriesCtrl = require('../controllers/entries')

router.post('/dashboards/:id/entries', entriesCtrl.create)
router.delete('/entries/:eId/categories/:cId', entriesCtrl.deleteCat)
router.delete('/entries/:eId/incomes/:iId', entriesCtrl.deleteIncome)

module.exports = router;