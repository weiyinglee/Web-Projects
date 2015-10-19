var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Posts = mongoose.model('Posts');

//////////GET Pages///////////////
//helper functions
function checkLogIn(req, res, next){
    //check the session
    if(req.session && req.session.user){
        //if there is a session, check the session
        Users.findOne({ Email: req.session.user.Email }, function(err, user){
           if(user){
               //if the user is already signed in, redirect to other pages
               res.redirect('/');
           }else{
               next();
           }
        });
    }else{
        next();
    }
}

function requireLogIn(req, res, next){
    //check the session
    if(req.session && req.session.user){
        //if there is a session, check the session
        Users.findOne({ Email: req.session.user.Email }, function(err, user){
            if(!user){
                // if the user is not yet logged in, redirect to login page
                res.redirect('/login');
            }else{
                next();
            }
        });
    }else{
        next();
    }
}

/* GET home page. */
router.get('/', function(req, res){
    res.render('index');
});

/* GET reg page */
router.get('/reg', checkLogIn, function(req, res) {
    res.render('reg');
});

/* GET log_in page */
router.get('/login', checkLogIn, function(req, res) {
    res.render('log_in');
});

/* GET about page. */
router.get('/about', function(req, res) {
    res.render('about');
});

/* GET product page. */
router.get('/product', function(req, res) {
    res.render('product');
});

/* GET blog page. */
router.get('/blog', function(req, res) {
    res.render('blog');
});

/* GET contact page. */
router.get('/contact', function(req, res) {
    res.render('contact');
});

/* GET logout section */
router.get('/logout/:page', function(req, res){
    req.session.reset();    //reset the session
    res.redirect('/' + req.params.page);
});


module.exports = router;