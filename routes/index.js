var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/howto', function(req, res, next) {
  res.render('howto',{ title: 'Express' , user:req.user});
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , user:req.user});
});

module.exports = router;
