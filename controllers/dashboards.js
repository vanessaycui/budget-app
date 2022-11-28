const User = require('../models/user');
module.exports = {
  index
};

function index(req, res) {
    // console.log("rendering index page for dashboards")
    // console.log(req.user)
    // res.render('dashboards/index', {
    //   user: req.user
    // });
    res.send(req.user)
}


