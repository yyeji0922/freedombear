var express = require('express');
var router = express.Router();
var User= require('../models/User.js');
var Med= require('../models/Med.js');

/* GET news listing. */
router.get('/my/show', function(req, res) {

    res.render('my_show', { title: 'My' });

});

router.get('/my/update', function(req, res) {
    res.render('my_show', { title: 'My' });

});
router.get('/my/posted', function(req, res) {
    res.render('my_show', { title: 'My' });

});


module.exports = router;
