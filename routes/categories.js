var router = require('express').Router();
var categoriesCtrl = require('../controllers/categories')


router.post('/dashboards/:id/categories/', categoriesCtrl.create)
router.get('/dashboards/:dId/categories/:cId', categoriesCtrl.show)
router.delete('/dashboards/:dId/categories/:cId', categoriesCtrl.delete)
router.put('/dashboards/:dId/categories/:cId', categoriesCtrl.update)
module.exports = router;
