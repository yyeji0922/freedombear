var express = require('express');
var async = require('async');
var mongoose = require('mongoose');
var passport=require('../config/passport.js')
var User= require('../models/User.js');
var path = require('path');
var router = express.Router();
 
router.get('/login',function(req,res){
    res.render('login',{id:req.flash('uid')[0], loginError:req.flash('loginError')});
});

/*
var user1 = new User({ uid: 'yyeji0922', 
      password: 'yyeji0922',
      name:'에지',
      point:0,
      email:'yyeji0922@naver.com',
      image:'default.jpg' });
      
var user2 = new User({ uid: 'ilikefruit', 
      password: 'ilikefruit',
      name:'다우니',
      point:0,
      email:'ilikefruit@naver.com',
      image:'default.jpg' });


router.get('/login/a',function(req,res){

  User.create(user2, function(err, data){
    if(err) return res.json({success: false, message: err});
    console.log("IN");
    res.redirect('/login');
});
});
 */

router.post('/login',
    function(req,res,next){
        req.flash("uid");
        if(req.body.uid.length === 0 || req.body.password.length === 0){
            req.flash("uid", req.body.id);
            req.falsh("loginError","Please enter BOTH id & password");
            res.redirect('/login');
            console.log("NO INPUT");
        }
        else {
          next();
        }
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
    res.render('login_new',{    
                                formData: req.flash('formData')[0],
                                nameError: req.flash('nameError')[0],
                                uidError: req.flash('uidError')[0],
                                passwordError: req.flash('passwordError')[0],
                                passwordConfirmationError: req.flash('passwordConfirmationError')[0],
                                careerError: req.flash('careerError')[0],
                                emailError: req.flash('emailError')[0]
                              });
})

router.post('/login/new',checkUserRegValidation, function(req,res,next){
  User.create(req.body.user, function(err,user){
        console.log("dd");
        if(err) return res.json({success:false, message:err});
        res.redirect('/login');
    })
})

function checkUserRegValidation (req, res, next) {
  var isValid = true;
  async.waterfall(
    [ function (callback) {
      User.findOne({'uid': req.body.user.uid, _id: {$ne: mongoose.Types.ObjectId(req.params.id)}},
        function (err,user) {
          if (user) {
            isValid = false;
            req.flash('uidError','- 이미 등록된 ID입니다.');
            console.log('Used ID');
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
            console.log('Used Email');
            
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
