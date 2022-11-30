const Dashboard = require('../models/dashboard')
const Entry = require('../models/entry')
module.exports = {
  create: createEntry
};


function createEntry(req, res){
    console.log("added to entries")
    console.log(req.body)
    // Dashboard.findById(req.params.id, function(err, dashboard){
    //     let entry = newEntry()
    //     dashboard.save(function(err){
    //         res.redirect(`/dashboards/${req.params.id}`)
    //     })
    // })
}


