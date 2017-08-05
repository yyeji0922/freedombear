var express = require('express');
var async=require('async');
var router = express.Router();
var Med= require('../models/Med.js');
var User= require('../models/User.js');
/* GET home page. */

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

router.post('/',function(req,res,next){
  Med.find( {$or: [ { name: req.body.q}, { writer_id  : req.body.q }, { title: req.body.q}, { email : req.body.q } ] }).limit(6).exec(function(err,data){
      if (err) return res.json({success: false, message: err});
      User.find({}).sort('point').limit(9).exec(function(err,data2){
        if (err) return res.json({success: false, message: err});
        res.render('index',{ medinfo : data , userinfo:data2, user:req.user} );
      });
    });
});
module.exports = router;