var router = require('express').Router();
var categoriesCtrl = require('../controllers/categories')


router.post('/dashboards/:id/categories', categoriesCtrl.create)

module.exports = router;
