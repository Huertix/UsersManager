var express = require('express');
var router = express.Router();

var Users = require('../models/user.js');



/* GET users list. */
router.get('/', function(req, res, next) {
  Users.find( function (err, users) {
    if(err) return next(err);
    res.json(users);
  });
});


/* GET user by ID. */
router.get('/:id', function(req, res, next) {
console.log(req.params.id);
    Users.findById( req.params.id, function (err, post) {
    if(err) return next(err);
    res.json(post);
  });
});


/* POST add user. */
router.post('/', function(req, res, next) {
    Users.create( req.body, function (err, post) {
        if(err) return next(err);
        res.json(post);
  });
});

/* POST add userGroup. */
router.post('/adduserGroup/:id/:group', function(req, res, next) {
    Users.findByIdAndUpdate(req.params.id, {$push: { 'groups' :  req.params.group }},
        {  safe: true, upsert: true},
        function(err, model) {
            if(err){
                console.log(err);
                return res.send(err);
            }
            return res.json(model);
        });
});


/* DELETE user. */
router.delete('/:id', function(req, res, next) {
  Users.findByIdAndRemove( req.params.id, req.body, function (err, post) {
    if(err) return next(err);
    res.json(post);
  });
});


/* DELETE userGroup. */
router.delete('/removeUserGroup/:id/:group', function(req, res, next) {
    Users.findByIdAndUpdate(req.params.id, {$pull: { 'groups' :  req.params.group }},
        {  safe: true, upsert: true},
        function(err, model) {
            if(err){
                console.log(err);
                return res.send(err);
            }
            return res.json(model);
        });
});


router.get('/newUser', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../views/addUser.html'));
});

module.exports = router;
