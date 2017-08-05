var express = require('express');
var async=require('async');
var bcrypt=require('bcrypt-nodejs');
var mongoose=require('mongoose');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var User= require('../models/User.js');
var Med= require('../models/Med.js');

var storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/upload/profile'),
  filename: function (req, file, cb) {
    cb(null, "pro"  + Date.now());
  }
});
var upload = multer({ storage: storage });

router.get('/my',isLoggedIn, function(req, res) {
  
  async.waterfall(
    
    [ function(callback){
      User.findById(req.user, function(err,data){
        
        if(err) return res.json({success:false, message:err}); 
        
        callback(null, data);
    })},
    function(args, callback){
      console.log(args.uid);
      Med.find({writer_id: args.uid },function(err,data){
        if(err) return res.json({success:false, message:err});
        callback(null,{medinfo:data, userinfo:args });
    })}
    ],
      function (err, data) {
        if (err) return res.json({success:'false', message: err});
          res.render('my_show',{user:req.user, data:data,
                      formData: req.flash('formData')[0],
                      emailError: req.flash('emailError')[0],     
                      nicknameError : req.flash('nicknameError')[0],
                      passwordError: req.flash('passwordError')[0],
                      passwordConfirmationError: req.flash('passwordConfirmationError')[0],
                      });
    }
  )
});
router.post('/my',upload.single('filetoupload'), function(req,res){
  console.log(req.file);
  User.findByIdAndUpdate(req.user, { 'image' : req.file.filename } ,function (err,content) {
		if(err) return res.json({success: false, message: err});
		res.redirect('/my');
	});
});

router.put('/my', isLoggedIn, checkUserRegValidation2, function(req,res){
  
  User.findById(req.user, req.body.user, function(err,user){

    if(err) return res.json( { success:"false", message:err });
    if(user.authenticate( req.body.user.password ) ){

      if(req.body.user.newpassword1.length!=0){
        if(req.body.user.newpassword1==req.body.user.newpassword2){
          req.body.user.password=req.user.hash(req.body.user.newpassword1); //req.body.user.newpassword1;//;
        }
        else{
          delete req.body.user.password;
        }
      } 
        console.log(req.body.user);
        User.findByIdAndUpdate(req.user, req.body.user, function(err,user){
            if (err) return res.json({success:'false', message: err});
            console.log("success");
            res.redirect('/my'); 
          });
      
    } else{
      console.log("WRONG PASSWORD");
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

/* 해야함.
router.post('/my/:id', isLoggedIn, function(req, res) {
    //var inserted= req.med;
  Med.findByIdAndUpdate(req.params.id, inserted, function(err,content){
    if (err) return res.json({success: false, message: err});
    res.rendirect('/my/show');
  });

});
 */
/* 해야함. 
router.delete('/my', isLoggedIn, function (req, res) {
	User.findOneAndRemove( req.user, function (err,user) {
    	if(err) return res.json({success: false, message: err});
        res.redirect('/my');
  });
});*/

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

function checkUserRegValidation2 (req, res, next) {
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
    }/*, function (isValid, callback) {
      User.findOne({email: req.body.user.email, _id: {$ne: mongoose.Types.ObjectId(req.params.id)}},
        function (err,user) {
          if (user) {
            isValid = false;
            req.flash('emailError','- 이미 등록된 e-mail입니다.');
            console.log('Used Email');
            
          }

          callback(null, isValid);
        }
      );}*/
    ], function (err, isValid) {
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
