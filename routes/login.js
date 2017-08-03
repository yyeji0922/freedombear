var express = require('express');
var mysql = require('mysql');
var async = require('async');
var router = express.Router();
const db_config = require('../config/db_config.json');
const pool = mysql.createPool(db_config);
// /*DB Connection*/

// con.connect();
// con.query('SELECT now()',function(err,rows,fields){
// 	if (err) throw err;
// 	console.log(rows);
// });

/* GET users listing. */
router.get('/login', function(req, res) {
 res.render('login',{id : req.flash("id")[0], loginError:req.flash("loginError")});
});

router.post('/login', function(req, res, next) {
    req.flash( "id" );    
    if( req.body.id.length === 0 || req.body.password.length === 0 ){
        req.flash( "id", req.body.id);
        req.flash( "loginError", "Please enter both email AND password" );
        req.redirect( '/login' );
    }
    else next(); 
    },
    passport.authenticate('local-login',{
        successRedirect : '/',
        failureRedirect : '/login',
        failureFalsh: true
    })
);
/*
router.get('/login/new', function(req, res) {
 res.render('login_new',{
                        formData : req.flash("formData")[0],
                        nicknameError : req.flash("nicknameError")[0],
                        passwordError : req.flash("passwordError")[0]
                        });
});

router.get('/login/logout',function(req,res){
    req.logout();
    res.redirect('/');
});
*/



    /*pool.getConnection( function (err, conn){
        if(err){
            res.status(500).send( 'error' );
            console.log( "Failed to Connect to Database" + err );
        }
        else{
            conn.query( 'select id, password from User where id=?' , [ req.body.id, req.body.password ], function(err,rows){
            if(err) console.log("hmm");
            else console.log("LOGIN!");
            });
        }
    }),
    function(){
        console.log("gg");
    }*/
module.exports = router;
