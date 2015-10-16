var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Posts = mongoose.model('Posts');

/* APIs */
//Authentication (reg)
router.post('/Authentication/reg', function(req, res) {
    //Save to SaleSiteDB
    var newUser = new Users({
        Email: req.body.Email,
        Username: req.body.Username,
        Password: req.body.Password
    });
    newUser.save(function(err){
        if(err) return console.log(err + ', failed to save');
        console.log('Successfully saved');
    });
    //set session & redirect
    req.session.user = req.body;
    res.json({
        Message: 'Successfully Registered'
    });
});

/* Authentication (login) */
router.post('/Authentication/login', function(req, res) {
    //set session & redirect
    req.session.user = req.body;
    res.json({
        Message: 'Successfully Login!'
    });
});

/* Add Posts */
router.post('/Posts/post', function(req, res){
    //save the content to SaleSiteDB
    var newPosts = new Posts({
        Author: req.session.user.Username,
        PostTitle: req.body.PostTitle,
        Message: req.body.Message,
        Date: new Date(),
        Comment: []
    });
    newPosts.save(function(err){
        if(err) return console.log('failed to save the posts');
        console.log('successfully saved posts');
    });
    res.json({
        Message: 'Successfully Posts'
    });
});

/* Update the Comment field in Posts */
router.post('/Posts/comment/:id', function(req, res){

    var id = req.params.id;

    //Save the data to DB
    var newComment = {
        Date: new Date(),
        Comment: req.body.Comment,
        Author: req.session.user.Username
    };

    //Put into Posts DB
    Posts.update({ _id: id }, { $push: { Comment: newComment }}, function(err){
        if(err) return res.json({ Message: 'Failed to update comments'});
        res.json({ Message: 'Successfully to update comments'});
    });

});


/* GET users' info */
router.get('/users_info', function(req, res){
    Users.find(function(err, data){
        res.json(data);
    });
});

/* GET users' posts */
router.get('/user_posts', function(req, res){
    Posts.find(function(err, data){
        res.json(data);
    });
});

/* GET certain user's posts */
router.get('/my_posts', function(req, res){
    Posts.find({ Author: req.session.user.Username }, function(err, data){
        res.json(data);
    });
});



module.exports = router;
