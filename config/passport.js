var passport=require('passport');
var User=require('../models/User.js');
var LocalStrategy=require('passport-local').Strategy;

passport.use('local-login',
    new LocalStrategy({
        usernameField : 'uid',
        passwordField : 'password',
        passReqToCallback :true 
    },
    function(req, uid, password, done){
        User.findOne({'uid' : uid}, function(err,user){
            if(err) return done(err);

            if(!user){
                console.log("No User Found");
                req.flash("uid", req.body.uid);
                return done(null, false, req.flash('loginError','No User Found'));               
            }
            if(!user.authenticate(password)){
                console.log("Wrong Password");
                req.flash("uid", req.body.uid);
                return done(null,false, req.flash('loginError','Password does not Match'));
            }
            return done(null,user);
        });
    })
);

passport.serializeUser( function(user,done){
    done(null, user.id);
});

passport.deserializeUser( function( id,done){
    User.findById(id, function(err,user){
        done(err, user);
    });
})

module.exports=passport;