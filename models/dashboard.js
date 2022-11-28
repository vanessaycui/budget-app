var mongoose = require('mongoose');

var dashboardSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  googleId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);