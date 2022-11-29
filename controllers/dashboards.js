const User = require('../models/user');
const Dashboard = require('../models/dashboard')

module.exports = {
  index,
  logout,
  new: newDashboard,
  create: createDashboard
};

function index(req, res) {
  //show user dashboards
  Dashboard.find({users: req.user.id}).populate('users').exec(function(err, dashboards){
      console.log(dashboards)
      res.render('dashboards/index', {
        user: req.user,
        dashboards
    })
  })
}

function newDashboard(req, res){
  res.render('dashboards/new')
}

function createDashboard(req, res){
  req.body.users = req.user.id
  let dashboard = new Dashboard(req.body)
  dashboard.save(function(err){
    if (err){
      console.log(err)
      return res.render('/dashboards/new')
    }
    res.redirect('/dashboards/new')
  })
  
}


//logout OAuth user
function logout(req, res){
  req.logout(function(err){
    res.redirect('/');
  });
}

