var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Posts = mongoose.model('Posts');

//////////GET Pages///////////////
//helper functions
function getPage(req, res, page){
    //check the session
    if(req.session && req.session.user){
        //if there is a session , check the session
        Users.findOne({ Email: req.session.user.Email }, function(err, user){
            if(!user){
                //the session is not for the right user, go to the unlogged in page
                res.locals.logIn = false;
                res.render(page);
            }else{
                // the session is for the right user
                if(page == 'reg' || page == 'log_in'){
                    //if user typed out url for going to reg or log_in page, redirect to index
                    res.redirect('/user/' + user.Username + '/index');
                }else{
                    res.redirect('/user/' + user.Username + '/' + page);
                }
            }
        });
    }else{
        res.locals.logIn = false;
        res.render(page);
    }
}

/* GET home page. */
router.get('/', function(req, res){
    getPage(req, res, 'index')
});

/* GET reg page */
router.get('/reg', function(req, res) {
    getPage(req, res, 'reg');
});

/* GET log_in page */
router.get('/login', function(req, res) {
    getPage(req, res, 'log_in');
});

/* GET about page. */
router.get('/about', function(req, res) {
    getPage(req, res, 'about');
});

/* GET product page. */
router.get('/product', function(req, res) {
    getPage(req, res, 'product');
});

/* GET blog page. */
router.get('/blog', function(req, res) {
    getPage(req, res, 'blog');
});

/* GET contact page. */
router.get('/contact', function(req, res) {
    getPage(req, res, 'contact');
});

/* GET user page */
router.get('/user/:name/:page', function(req, res){

    var directPage = req.params.page;

    //check the session
    if(req.session && req.session.user){
        Users.findOne({ Email: req.session.user.Email }, function(err, user){
            if(!user){
                //the session is not for the right user, back to login page
                res.redirect('/login');
            }else{
                // the session is for the right user
                res.locals.user = user;
                res.locals.logIn = true;
                res.render(directPage);
            }
        });
    }else{
        res.redirect('/login');
    }
});

/* GET logout section */
router.get('/logout/:page', function(req, res){
    req.session.reset();    //reset the session
    res.redirect('/' + req.params.page);
});


module.exports = router;