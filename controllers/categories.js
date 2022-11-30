const Dashboard = require('../models/dashboard')
const Entry = require('../models/entry')

module.exports = {
    show,
    create: createCategory
};

function show(req, res){

    Dashboard.findById(req.params.dId).exec(function(err, dashboard){
        dashboard.categories.forEach(category=>{
            if (category.id === req.params.cId){
                Entry.find({category: category.name, dashboard: req.params.dId}).exec(function(err, results){
                    console.log(results)
                    res.render('./categories/show', {category: category, results: results})

                })
            }
        })
    })


    

}

function createCategory(req, res){
    console.log("added to categories")
    Dashboard.findById(req.params.id, function(err, dashboard){
        dashboard.categories.push(req.body)
        dashboard.save(function(err){
            res.redirect(`/dashboards/${req.params.id}`)
        })
    })
}



