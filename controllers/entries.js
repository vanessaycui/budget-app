const Entry = require('../models/entry')
module.exports = {
  create: createEntry,
  delete: deleteEntry
};


function createEntry(req, res){
  req.body.dashboard = req.params.id
  let entry = new Entry(req.body)
  entry.save(function(err){
    console.log("added to entries")
    res.redirect(`/dashboards/${req.params.id}`)
  })         
}

function deleteEntry(req,res){
  console.log(req.params)

  Entry.findById(req.params.eId).exec(function(err, entry){
    entry.remove()
    entry.save(function(err){
      res.redirect(`/dashboards/${entry.dashboard}/categories/${req.params.cId}`)
    })
  })
}
