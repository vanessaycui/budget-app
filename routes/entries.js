var router = require('express').Router();
var entriesCtrl = require('../controllers/entries')

router.post('/dashboards/:id/entries', isLoggedIn, entriesCtrl.create)
router.delete('/entries/:eId/categories/:cId',isLoggedIn, entriesCtrl.deleteCat)
router.delete('/entries/:eId/incomes/:iId',isLoggedIn, entriesCtrl.deleteIncome)
router.put('/entries/:eId/categories/:cId',isLoggedIn,entriesCtrl.updateCat)
router.put('/entries/:eId/incomes/:iId',isLoggedIn,entriesCtrl.updateIncome)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/auth/google')
  }

module.exports = router;