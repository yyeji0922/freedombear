var express = require('express');
var router = express.Router();

/* GET news listing. */
router.get('/med', function(req, res) {
 res.render('med', { title: 'med' });
});

module.exports = router;
