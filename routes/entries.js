var router = require('express').Router();
var entriesCtrl = require('../controllers/entries')

router.post('/dashboards/:id/entries', entriesCtrl.create)
router.delete('/entries/:eId/categories/:cId', entriesCtrl.delete)

module.exports = router;