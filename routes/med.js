var express = require('express');
var router = express.Router();
// var mysql = require('mysql');
// /*DB Connection*/
// var con = mysql.createConnection({
// 	host : '10.10.10.10',
// 	port : 3306,
// 	user : 'freedombear',
// 	password:'freedombear',
// 	database:'freedombear'
// });

// con.connect();
// con.query('SELECT now()',function(err,rows,fields){
// 	if (err) throw err;
// 	console.log(rows);
// });

/* GET news listing. */
router.get('/med', function(req, res) {
 res.render('med', { title: 'med' });
});

module.exports = router;
