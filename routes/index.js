var express = require('express');
var router = express.Router();
var Med= require('../models/Med.js');
var User= require('../models/User.js');
/* GET home page. */

router.get('/test', function(req, res,next) {
  res.render('finduser',{ title: 'Express' , user:req.user});
});

router.get('/howto', function(req, res, next) {
  res.render('howto',{ title: 'Express' , user:req.user});
});

router.get('/', function(req, res, next) {
  Med.find({}).sort('due_date').limit(6).exec(function(err,data){
    if (err) return res.json({success: false, message: err});
    User.find({}).sort('point').limit(9).exec(function(err,data2){
      if (err) return res.json({success: false, message: err});
      res.render('index',{ medinfo : data , userinfo:data2, user:req.user} );
    });
  })
});

module.exports = router;