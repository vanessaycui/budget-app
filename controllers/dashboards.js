const User = require('../models/user');
module.exports = {
  index

};

function index(req, res, next) {
    console.log("rendering index page for dashboards")
    console.log(req.user)
    res.render('dashboards/index', {
      user: req.user
    });
}


