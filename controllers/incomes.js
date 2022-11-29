const Dashboard = require('../models/dashboard')

module.exports = {
  create: createIncome
};


function createIncome(req, res){
    console.log(req.body)
    Dashboard.findById(req.params.id, function(err, dashboard){
        dashboard.incomes.push(req.body)
        dashboard.save(function(err){
            res.redirect(`/dashboards/${req.params.id}`)
        })
    })
}


