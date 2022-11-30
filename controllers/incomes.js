const Dashboard = require('../models/dashboard')
const Entry = require('../models/entry')

module.exports = {
    show,
    create: createIncome
};

function show(req, res){

    Dashboard.findById(req.params.dId).exec(function(err, dashboard){
        dashboard.incomes.forEach(income =>{
            if (income.id === req.params.iId){
                Entry.find({dashboard: req.params.dId, incomeType: income.incomeType}).exec(function(err,results){
                
                    console.log(results)
                    res.render('./incomes/show', {income: income, results: results})
                })

               
            }
        })
    })
}

function createIncome(req, res){
    console.log(req.body)
    Dashboard.findById(req.params.id, function(err, dashboard){
        dashboard.incomes.push(req.body)
        dashboard.save(function(err){
            res.redirect(`/dashboards/${req.params.id}`)
        })
    })
}


