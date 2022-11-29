var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  name: {
    type: String,
  },
})	

const categorySchema = new Schema({
  category: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    min: 0,
  }
})	
const incomeSchema = new Schema({
  incomeType: String
})	

var dashboardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  entries: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entry'
  },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  categories: [categorySchema],
  members: [memberSchema],
  incomes: [incomeSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Dashboard', dashboardSchema);