var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = mongoose.model('Users');

// Helper functions
function checkLogin(req, res, next){
    //if there is any session existing
    if(req.session && req.session.user){
        //verify the session
        Users.findOne({Username: req.session.user.Username}, function(err, user){
            if(user){
                //if the session is right then redirect to users page
                res.redirect('/users/' + user.Username);
            }else{
                //if not, then proceed to original page
                next();
            }
        });
    }else{
        //No session then proceed to original page
        next();
    }
}

function requireLogin(req, res, next){
    //if there is any session existing
    if(req.session && req.session.user){
        //verify the session
        Users.findOne({Username: req.session.user.Username}, function(err, user){
            if(!user){
                //if the session is not user, then redirect to login page
                res.redirect('/login');
            }else{
                //if it's the user, then proceed to the page
                next();
            }
        });
    }else{
        //if there is no session, then redirect to login page
        res.redirect('/login');
    }
}

/* Home page. */
router.get('/', function(req, res){
    res.render('index.html');
});

/* Register page */
router.get('/reg', checkLogin, function(req, res) {
    res.render('reg.html');
});

/* Login page */
router.get('/login', checkLogin, function(req, res){
    res.render('login.html');
});

/* Users page */
router.get('/users/:name', requireLogin, function(req, res){
    res.render('user.html');
});

/* logout section */
router.get('/logout', function(req, res){
    req.session.reset();
    res.redirect('/');
});

module.exports = router;