var mongoose = require('mongoose');
   
var GroupSchema = new mongoose.Schema({
    name:       { type: String, required: true },
    create_at:  { type: Date, default: Date.now },
    lastLogin:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Group', GroupSchema);