var express = require('express');
var router = express.Router();
var Med= require("../models/Med");
var User= require("../models/User");
var multer = require('multer');
var path = require('path');
const dede = 1; 

var storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/upload/med'),
  filename: function (req, file, cb) {
    cb(null, "med"  + Date.now());
  }
});

var upload = multer({ storage: storage });

/* GET news listing. */

/*
router.get('/med/:id',isLoggedIn, function(req, res,next) {
    
    if(req.params.id==1){
        Med.find({}).sort('-pay').exec( function(err,data){
            if (err) return res.json({success: false, message: err, user:req.user});
            res.render('med',{ data : data, user:req.user} );
        });
    }
    else if(req.params.id==2){
        Med.find({}).sort('pay').exec( function(err,data){
            if (err) return res.json({success: false, message: err, user:req.user});
            res.render('med',{ data : data, user:req.user} );
        });
    }
    else if(req.params.id==3){
        Med.find({}).sort('-upload_time').exec( function(err,data){
            if (err) return res.json({success: false, message: err, user:req.user});
            res.render('med',{ data : data, user:req.user} );
        });
    }
    else{
        Med.find({}).sort('due_date').exec( function(err,data){
            if (err) return res.json({success: false, message: err, user:req.user});
            res.render('med',{ data : data, user:req.user} );
        });
    }
});
*/
/* search & show */
router.post('/med', isLoggedIn,function(req, res, next) {
    console.log(req.body.which);
    next( req.body.which );
});
 
router.get('/med', isLoggedIn, function(req, res,next) {
        Med.find({}).sort('-upload_time').exec( function(err,data){
            if (err) return res.json({success: false, message: err, user:req.user});
            res.render('med',{ data : data, user:req.user} );
        });
});
/*새로운 news 작성-> 완료*/
//LOGIN!
router.get('/med/new',isLoggedIn, function(req, res) {
    User.findById(req.user, function(err,data){
        if(err) return res.json({success:false,message:err});
        res.render('med_form',{user:req.user,data:data});
    })
    //if(err) return res.json({success:false, message:err});
    
});

/*새로운 news 작성 ->완료*/ 
//LOGIN!
router.post('/med/new', upload.single('filetoupload'),isLoggedIn,/*upload.single('filetoupload'),*/ function (req, res) {
    console.log(req.body);
    var due_date = req.body.date;
    var strDate = due_date.split('/');
    var mydate = new Date(parseInt(strDate[2],10),parseInt(strDate[0],10),parseInt(strDate[1],10),23,59);

    User.findById(req.user, function(err,data){
        if(err)  return res.json({success:false, messsage:err});
        var med1 = new Med({
            title:req.body.title,
            content:req.body.content,
            writer_id: data.uid,
            email:req.body.email,
            due_date: mydate,
            pay:req.body.pay,
            summary:req.body.summary,
            image: req.file.filename
        });
        console.log(med1);
        /*
        Med.create(med1,function(err,med1){
            if(err) return res.json({success:false, messsage:err});
            res.redirect('/med');
        });*/

        /*Med.save(med1,function(err,result){
            if(err) return res.json({success:false, messsage:err});
            res.redirect('/med');
        });*/

        Med.create(med1, function(err,med1){
            if(err) return res.json({success:false, message:err});
            res.redirect('/med');
        });
    });
    

    /*med1.save(function(err,med1){
        if(err)
            console.log("error:can't insert");
        else
            console.log("insertion success");
    });
    res.redirect('/med');*/

});

/*news 보여주기*/
router.get('/med/:id', isLoggedIn,function(req, res) {
    Med.findById(req.params.id, function(err,content){
        if (err) return res.json({success: false, message: err});
        res.render('med_per', { data : content , showornot : 0 ,user:req.user} );
    });
 });

/*update 페이지로 고우*/
//LOGIN
router.get('/med/:id/update', isLoggedIn,function(req, res) {
    Med.findById(req.params.id, function(err,content){
        if (err) return res.json({success: false, message: err});
        res.render('med_per', { data : content , showornot : 1 ,user:req.user} );
    });    
});

/*update 페이지 update*/
//LOGIN + 내꺼
router.post('/med/:id/update', isLoggedIn,function(req, res) {
    var updated={title: req.body.title, content:req.body.content, contact:req.body.contact, email:req.body.email, due_date:req.body.due_date, pay:req.body.pay, finished:req.body.finished, summary:req.body.summary };
	Med.findByIdAndUpdate(req.params.id, updated, function (err,content) {
		if(err) return res.json({success: false, message: err, user:req.user});
		res.redirect('back');
	});

});

/*update 해서 지우기로함*/
//LOGIN
router.delete('/med/:id/update', isLoggedIn,function(req, res) {
    News.findOneAndRemove({ _id : req.params.id }, function (err,user) {
    	if(err) return res.json({success: false, message: err,user:req.user});
      res.redirect('back');
  });
});


function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
