const Dashboard = require('../models/dashboard')

module.exports = {
  create: createCategory
};


function createCategory(req, res){
    console.log(req.body)

    Dashboard.findById(req.params.id, function(err, dashboard){
        dashboard.categories.push(req.body)
        dashboard.save(function(err){
            res.redirect(`/dashboards/${req.params.id}`)
        })
    })
}


