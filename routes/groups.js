var express = require('express');
var router = express.Router();

var Groups = require('../models/group.js');



/* GET groups list. */
router.get('/', function(req, res, next) {
  Groups.find( function (err, groups) {
    if(err) return next(err);
    res.json(groups);
  });
});


/* GET user by ID. */
router.get('/:id', function(req, res, next) {
console.log(req.params.id);
    Groups.findById( req.params.id, function (err, post) {
    if(err) return next(err);
    res.json(post);
  });
});


/* POST add group. */
router.post('/', function(req, res, next) {
    Groups.create( req.body, function (err, post) {
        if(err) return next(err);
        res.json(post);
  });
});


/* DELETE group. */
router.delete('/:id', function(req, res, next) {
  Groups.findByIdAndRemove( req.params.id, req.body, function (err, post) {
    if(err) return next(err);
    res.json(post);
  });
});

router.get('/newGroup', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../views/addGroup.html'));
});

module.exports = router;