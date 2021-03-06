var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Posts = mongoose.model('Posts');

var bcrypt = require('bcryptjs');

/* APIs */
//Authentication (reg)
router.post('/Authentication/reg', function(req, res) {

    var hash = bcrypt.hashSync(req.body.Password, bcrypt.genSaltSync(10));

    //Save to SaleSiteDB
    var newUser = new Users({
        Email: req.body.Email,
        Username: req.body.Username,
        Password: hash
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

    Users.findOne({ Username: req.body.Username }, function(err, user){
        if(user){
            if(bcrypt.compareSync(req.body.Password, user.Password)){
                //set session & redirect
                req.session.user = user;
                res.json({
                    login: true,
                    username: user.Username,
                    Message: 'Successfully Login!'
                });
            }else{
                res.json({
                    login: false,
                    username: '',
                    Message: 'Invalid Password!'
                });
            }
        }else{
            Users.findOne({ Email: req.body.Username }, function(err, user){
                if(user){
                    if(bcrypt.compareSync(req.body.Password, user.Password)){
                        //set session & redirect
                        req.session.user = user;
                        res.json({
                            login: true,
                            username: user.Username,
                            Message: 'Successfully Login!'
                        });
                    }else{
                        res.json({
                            login: false,
                            username: '',
                            Message: 'Invalid Password!'
                        });
                    }
                }else{
                    res.json({
                        login: false,
                        username: '',
                        Message: 'Username/Email is not found!'
                    });
                }
            });
        }
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

/* PUT update one post */
router.put('/Posts/comment/update/:id', function(req, res){

    var id = req.params.id;

    Posts.update({ _id: id },
        { $set: {
            Message: req.body.Post,
            Date: new Date()
    }}, function(err){
        if(err) return res.json({ Message: 'Failed to update post'});
        res.json({Message: 'Successfully to update post'});
    });

});

/* Delete the one Post */
router.delete('/Posts/comment/deletion/:id', function(req, res){

    var id = req.params.id;

    Posts.remove({_id: id}, function(err){
        if(err) return res.json({Message: 'Failed to delete the post'});
        res.json({Message: 'Successfully delete the post'});
    });
});

/* GET users' login status */
router.get('/login_status', function(req, res){
    if(req.session && req.session.user){
        Users.findOne({ Email: req.session.user.Email }, function(err, user){
            if(user){
                res.json({
                    username: user.Username,
                    login: true
                });
            }else{
                res.json({
                    username: '',
                    login: false
                });
            }
        });
    }else{
        res.json({
            username: '',
            login: false
        });
    }
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
