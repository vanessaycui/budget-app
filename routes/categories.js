var router = require('express').Router();
var categoriesCtrl = require('../controllers/categories')


router.post('/dashboards/:id/categories/', isLoggedIn,categoriesCtrl.create)
router.get('/dashboards/:dId/categories/:cId', isLoggedIn, categoriesCtrl.show)
router.delete('/dashboards/:dId/categories/:cId',isLoggedIn, categoriesCtrl.delete)
router.put('/dashboards/:dId/categories/:cId', isLoggedIn,categoriesCtrl.update)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/auth/google')
  }


module.exports = router;
