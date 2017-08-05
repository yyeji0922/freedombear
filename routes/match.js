var express = require('express');
var router = express.Router();
var Med= require('../models/Med.js');
var User= require('../models/User.js');
/* GET home page. */

router.get('/match', isLoggedIn, function(req, res, next) {
  res.render('finduser',{ title: 'Express' , user:req.user});
});

router.post('/match/:id', isLoggedIn, function(req, res, next) {
  if(req.params.id==1){
    User.find( {$or: [ { lang: -1}, {major :-1} ] }).limit(6).exec(function(err,data){
       if (err) return res.json({success: false, message: err});
       res.render('founduser',{ data:data , user:req.user});
    });
  }
  else if (req.params.id==2){
    var major=0;
    if(typeof req.body.major=="string"){
      console.log("Here");
      if(req.body.major == -1) major=-1;
      else major=1<<(req.body.major-1);
    }
    else{
      console.log("Tere");
      for(var j=0; j<req.body.major.length; j++){
          if(req.body.major[j]==-1){
            continue;
          }
          else{
            major+=1<<(req.body.major[j]-1);
          }
        }
    }
    User.find(  {major :major} ).limit(6).exec(function(err,data){
       if (err) return res.json({success: false, message: err});
       res.render('founduser',{ data:data , user:req.user});
    });

  }
  else if (req.params.id==3){
    var lang=0;
    if(typeof req.body.lang=="string"){
      if(req.body.lang==-1) lang=-1;
      else lang=1<<(req.body.lang-1);
    }
    else{
      for(var j=0; j<req.body.lang.length; j++){
        if(req.body.lang[j]==-1){
          continue;
          }
        else{
          lang+=1<<(req.body.lang[j]-1);
          }
        }
    }
    User.find(  {lang :lang} ).limit(6).exec(function(err,data){
       if (err) return res.json({success: false, message: err});
       res.render('founduser',{ data:data , user:req.user});
    });
  }
  else return res.json({success:'false', message: "WRONG URL"});  
});


function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;