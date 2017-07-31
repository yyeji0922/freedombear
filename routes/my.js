var express = require('express');
var router = express.Router();

/* GET news listing. */
router.get('/my', function(req, res) {
 res.render('my_show', { title: 'My' });

});

module.exports = router;
