var express = require('express');
var async=require('async');
var mongoose=require('mongoose');
var router = express.Router();
var User= require('../models/User.js');
var Med= require('../models/Med.js');

/* 해야함. 
router.get('/my/show', isLoggedIn, function(req, res) {
    User.findById( req.user, function(errs, datas){
        if(errs) return res.json({success:false, message:errs});
        Med.find({ writer_id : datas.uid }, function(err,data){
            if(err) return res.json({success:false, message:err});
            console.log(data);
            res.render('my_show', { title: 'My' ,user: req.user, data: data});
        });
    });
});
*/

router.get('/my',isLoggedIn, function(req, res) {
  
  async.waterfall(
    
    [ function(callback){
      User.findById(req.user, function(err,data){
        
        if(err) return res.json({success:false, message:err}); 
        
        callback(null, data);
    })},
    function(args, callback){
      Med.find({writer_id: args.uid },function(err,data){
        if(err) return res.json({success:false, message:err});
        data={};
        callback(null,{medinfo:data, userinfo:args });
    })}
    ],
      function (err, data) {
        console.log(data);
        if (err) return res.json({success:'false', message: err});
          res.render('my_show',{user:req.user, data:data});
    }
  )
});

router.post('/my',checkUserRegValidation, function(req,res){
  User.findById(req.user, function(err,user){
    if(err) return res.json( { success:"false", message:err });
    console.log("1");
    if(req.body.user.password==user.password){
      if(req.body.user.newpassword){
        req.body.user.password=req.body.user.newpassword;
      } else{
        delete req.body.user.password;
      }
      User.findByIdAndUpdate(req.user, req.body.user,function(err,user){
        if(err) return res.json({success:"false",message:err});
        res.redirect('/my');
      });
    } else{
      req.flash("formData",req.body.user);
      req.flash("passwordError","-Invalid password");
      res.redirect('/my');
    }
  })
})

router.get('/my/:id', isLoggedIn, function(req, res) {

  Med.findById(req.params.id, function(err,content){
    if (err) return res.json({ success: false, message: err});
    res.render('med_per', { title: 'My',user: req.user ,data:content});
  });

});

router.get('/my/test', function(req, res) {

    res.render('find_user', {user: req.user });


});

/* 해야함.
router.post('/my/:id', isLoggedIn, function(req, res) {
    //var inserted= req.med;
  Med.findByIdAndUpdate(req.params.id, inserted, function(err,content){
    if (err) return res.json({success: false, message: err});
    res.rendirect('/my/show');
  });

});
 */
/* 해야함. */
router.delete('/my/:id', isLoggedIn, function (req, res) {
	Med.findOneAndRemove({ _id : req.params.id }, function (err,user) {
    	if(err) return res.json({success: false, message: err});
        res.redirect('/my');
  });
});

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

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
