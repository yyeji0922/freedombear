var express = require('express');
var async = require('async');
var path = require('path');
var passport=require('../config/passport.js')
var User= require('../models/User.js');
var router = express.Router();
 
router.get('/login',function(req,res){
    res.render('login',{id:req.flash('id'),loginError:req.flash('loginError')});
});

router.post('/login',
    function(req,res,next){
        req.flash("id");
        if(req.body.id.length === 0 || req.body.password.length === 0){
            req.flash("id", req.body.id);
            req.falsh("loginError","Please enter BOTH id & password");
            res.redirect('/login');
        }
        else next();
    },
    passport.authenticate('local-login',{
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash :true
}));

router.get('/login/logout',function(req,res){
    req.logout();
    res.redirect('/login');
});

router.get('/login/new',function(req,res){
    res.render('login_new');
})

router.post('/login/new',checkUserRegValidation, function(req,res,nest){
    User.create(req.body.user, function(err,user){
        if(err) return res.json({success:false, message:err});
        res.redirect('/login');
    })
})

function checkUserRegValidation (req, res, next) {
  var isValid = true;

  async.waterfall(
    [function (callback) {
      User.findOne({uid: req.body.user.uid, _id: {$ne: mongoose.Types.ObjectId(req.params.id)}},
        function (err,user) {
          if (user) {
            isValid = false;
            req.flash('uidError','- 이미 등록된 ID입니다.');
          }
          callback(null, isValid);
        }
      );
    }, function (isValid, callback) {
      User.findOne({email: req.body.user.email, _id: {$ne: mongoose.Types.ObjectId(req.params.id)}},
        function (err,user) {
          if (user) {
            isValid = false;
            req.flash('emailError','- 이미 등록된 e-mail입니다.');
          }
          callback(null, isValid);
        }
      );
    }], function (err, isValid) {
      if (err) return res.json({success:'false', message: err});
      if (isValid) {
        return next();
      } else {
        req.flash('formData', req.body.user);
        res.redirect('back');
      }
    }
  );
}

module.exports = router;
