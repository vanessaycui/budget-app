const User = require('../models/user');
const Dashboard = require('../models/dashboard')

module.exports = {
  index,
  logout,
  create: createDashboard
};

function index(req, res) {
  //show dashboards associated with user.
  Dashboard.find({users: req.user.id}).populate('users').exec(function(err, dashboards){
      console.log(dashboards)
      res.render('dashboards/index', {
        user: req.user,
        dashboards
    })
  })
}

function createDashboard(req, res){
  req.body.users = req.user.id
  let dashboard = new Dashboard(req.body)
  dashboard.save(function(err){
    if (err){
      console.log(err)
      return res.render('/dashboards')
    }
    res.redirect('/dashboards')
  })
  
}


//logout OAuth user
function logout(req, res){
  req.logout(function(err){
    res.redirect('/');
  });
}

