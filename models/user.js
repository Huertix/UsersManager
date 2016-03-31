var mongoose = require('mongoose');
   
var UserSchema = new mongoose.Schema({
    name:       { type: String, required: true },
    email:      { type: String, required: true },
    password:   { type: String, required: true },
    groups:     [],
    create_at:  { type: Date, default: Date.now },
    lastLogin:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
