const Entry = require('../models/entry')
module.exports = {
  create: createEntry
};


function createEntry(req, res){
  
  console.log(req.body)
  req.body.dashboard = req.params.id
  let entry = new Entry(req.body)
  entry.save(function(err){
    console.log("added to entries")
    res.redirect(`/dashboards/${req.params.id}`)
  })         
}


