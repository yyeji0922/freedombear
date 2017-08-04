var express = require('express');
var router = express.Router();
var mysql= require('mysql');
var db_config = require('../config/db_config.json');
var pool = mysql.createPool(db_config);

/*var storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/upload/news'),
  filename: function (req, file, cb) {
    cb(null, "news"  + Date.now());
  }
});
var upload = multer({ storage: storage });
*/

/* GET news listing. */
router.get('/med', function(req, res) {
    //if(err) return res.json({success:false, message:err}); 
    res.render('med');
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
    /*pool.getConnection(function(error, connection) {
        if (error) {
            console.log("getConnection error" + error);
            res.status(500).send(error);
        } else {
            var sql_search = 'select music_id from musicmining.play_list where user_id = ? and music_id = ?';
            connection.query(sql_search, [req.body.user_id, req.body.music_id], function(error, rows) {
                if (error) {
                    console.log("찾는거 실패"+error);
                } else {
                    console.log("SUCCESS");
                }
            });           
        }
    });*/
    res.redirect('/med');
    
});

/*news 보여주기*/
router.get('/med/:post_id', function(req, res) {
    //if(err) return res.json({success:false, message:err});
    res.render('med_per');
});

/*update 페이지로 고우*/
//LOGIN
router.get('/med/:post_id/update', function(req, res) {
    //if(err) return res.json({success:false, message:err});
    res.render('med_per');
});

/*update 페이지 update*/
//LOGIN + 내꺼
router.post('/med/:post_id/update', function(req, res) {
    //if(err) return res.json({success:false, message:err});
    res.redirect('back');
});

/*update 해서 지우기로함*/
//LOGIN
router.delete('/med/:post_id/update', function(req, res) {
    //if(err) return res.json({success:false, message:err});
    res.redirect('back');
});

module.exports = router;
