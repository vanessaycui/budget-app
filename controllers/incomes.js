const Dashboard = require('../models/dashboard')
const Entry = require('../models/entry')

module.exports = {
    show,
    create: createIncome,
    delete: deleteIncome
};

function show(req, res){

    Dashboard.findById(req.params.dId).exec(function(err, dashboard){
        dashboard.incomes.forEach(income =>{
            if (income.id === req.params.iId){
                Entry.find({dashboard: req.params.dId, incomeType: income.incomeType}).exec(function(err,results){
                
                    console.log(results)
                    res.render('./incomes/show', {dashboard: dashboard, income: income, results: results})
                })

               
            }
        })
    })
}

function createIncome(req, res){
    Dashboard.findById(req.params.id, function(err, dashboard){
        dashboard.incomes.push(req.body)
        dashboard.save(function(err){
            res.redirect(`/dashboards/${req.params.id}`)
        })
    })
}

function deleteIncome(req, res){
    Dashboard.findById(req.params.dId, function(err, dashboard){
        dashboard.incomes.forEach(income=>{
            if (income.id === req.params.iId){
                income.remove()
            }
        })
        dashboard.save(function(err){
            res.redirect(`/dashboards/${req.params.dId}`)
        })
    })
}