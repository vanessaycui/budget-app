var router = require('express').Router();
var incomesCtrl = require('../controllers/incomes')

router.get('/dashboards/:dId/incomes/:iId', isLoggedIn,incomesCtrl.show)
router.post('/dashboards/:id/incomes', isLoggedIn, incomesCtrl.create)
router.delete('/dashboards/:dId/incomes/:iId',isLoggedIn, incomesCtrl.delete)
router.put('/dashboards/:dId/incomes/:iId', isLoggedIn, incomesCtrl.update)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/auth/google')
  }

module.exports = router;
