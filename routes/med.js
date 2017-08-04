var express = require('express');
var router = express.Router();
var Med= require("../models/Med");

/* GET news listing. */
router.get('/med', function(req, res,next) {
    Med.find({}).sort('-due_date').exec( function(err,data){
		if (err) return res.json({success: false, message: err});
		res.render('med',{ data : data} );
	});
});

/* serach & show */
router.post('/med', function(req, res) {
    console.log(req.body.query);
    res.redirect('/med');
});


/*새로운 news 작성*/
//LOGIN!
router.get('/med/new', function(req, res) {

    //if(err) return res.json({success:false, message:err});
    res.render('med_form');
});

/*새로운 news 작성*/ 
//LOGIN!
router.post('/med/new', /*upload.single('filetoupload'),*/ function (req, res) {
    console.log(req.body);

    res.redirect('/med');
    
});

/*news 보여주기*/
router.get('/med/:id', function(req, res) {
    Med.findById(req.params.id, function(err,content){
        if (err) return res.json({success: false, message: err});
        res.render('med_per', { data : content , showornot : 0 } );
    });
 });

/*update 페이지로 고우*/
//LOGIN
router.get('/med/:id/update', function(req, res) {
    Med.findById(req.params.id, function(err,content){
        if (err) return res.json({success: false, message: err});
        res.render('med_per', { data : content , showornot : 1 } );
    });    
});

/*update 페이지 update*/
//LOGIN + 내꺼
router.post('/med/:id/update', function(req, res) {
    var updated={title: req.body.title, content:req.body.content, contact:req.body.contact, email:req.body.email, due_date:req.body.due_date, pay:req.body.pay, finished:req.body.finished, summary:req.body.summary };
	Med.findByIdAndUpdate(req.params.id, updated, function (err,content) {
		if(err) return res.json({success: false, message: err});
		res.redirect('back');
	});

});

/*update 해서 지우기로함*/
//LOGIN
router.delete('/med/:id/update', function(req, res) {
    News.findOneAndRemove({ _id : req.params.id }, function (err,user) {
    	if(err) return res.json({success: false, message: err});
      res.redirect('back');
  });
});

module.exports = router;
