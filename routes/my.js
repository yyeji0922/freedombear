var express = require('express');
var router = express.Router();
var User= require('../models/User.js');
var Med= require('../models/Med.js');

/* GET news listing. */
router.get('/my/show', function(req, res) {
    /*User.findById(req.user, function(errs, datas){
        if(errs) return res.json({success:false, message:err});

        Med.find({ writer_id : datas.uid}, function(err,data){
            if(err) return res.json({success:false, message:err});
            res.render('my_show', { title: 'My' ,user: req.user, data: data});
        });
        
    });
    */
    res.render('my_show', { title: 'My' ,user: req.user});
});

router.get('/my/update', function(req, res) {
    res.render('my_update', { title: 'My' ,user: req.user});

});

router.get('/my/posted/list', function(req, res) {
    res.render('my_show', { title: 'My',user: req.user });

});


module.exports = router;
