var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Posts = mongoose.model('Posts');

var bcrypt = require('bcryptjs');

/* users APIs */

//Providing the user's login status
router.get('/users/login_status', function(req, res){
   if(req.session && req.session.user){
       Users.findOne({Username: req.session.user.Username}, function(err, user){
          if(user){
              res.json({
                  Name: user.Username,
                  login: true
              });
          }else{
              res.json({login: false});
          }
       });
   }else{
       res.json({login: false});
   }
});

//Providing all users' posts
router.get('/users/users_posts', function(req, res){
    Posts.find(function(err, post){
        res.json(post);
    });
});

//Providing one certain user's post
router.get('/users/users_posts/:id', function(req, res){

    var id = req.params.id;

    Posts.findOne({_id: id}, function(err, user){
        res.json(user);
    });
});

//Authentication the account/password
router.post('/users/Authentication', function(req, res){

    var username = req.body.Username;
    var pw = req.body.Password;

    //check if the user is existed
    Users.findOne({Username: username}, function(err, user){
       if(!user){
           res.json({
               Message: 'The username is not found!',
               Success: false
           });
       }else{
           if(bcrypt.compareSync(pw, user.Password)){   //compare the passwords with original state
                req.session.user = user;    //set the session
                res.json({
                    Message: 'Successfully Log in!',
                    Success: true
                });
           }else{
               res.json({
                   Message: 'The password is incorrect!',
                   Success: false
               });
           }
       }
    });

});

//Register new account/password
router.post('/users/Register', function(req, res){

    var username = req.body.Username;
    var pw = req.body.Password;

    //Hashing the password for security
    var hash = bcrypt.hashSync(pw, bcrypt.genSaltSync(10));

    //check if the user is already existed
    Users.findOne({Username: username}, function(err, data){
        if(data){
            res.json({
                Message: 'Username is already existed',
                Success: false
            });
        }else{
            Users.findOne({Password: pw}, function(err, data){
                if(data){
                    res.json({
                        Message: 'User password is already existed',
                        Success: false
                    });
                }else{
                    var newUser = new Users({
                        Username: username,
                        Password: hash
                    });
                    newUser.save(function(err){
                        if (err) return res.send(err);
                        res.json({
                            Message: 'Successfully saved user',
                            Success: true
                        });
                    });
                    req.session.user = newUser; //set the session
                }
            });
        }
    });
});

//POST new post
router.post('/users/post_data', function(req, res){

    var post = req.body.Content;

    var newPost = new Posts({
        Author: req.session.user.Username,
        Date: new Date(),
        Content: post
    });
    newPost.save(function(err){
        if(err) return res.send(err);
        res.json({
            Message: 'Successfully saved post',
            Post: newPost
        });
    });

});

//DELETE a certain post
router.delete('/users/post_data/:id', function(req, res){

    var id = req.params.id;

    Posts.remove({_id: id}, function(err, data){
        if(err) return res.send(err);
        res.json({
            Message: 'Successfully deleted the data',
            Data: data
        });
    });

});

//PUT (update) a certain post
router.put('/users/post_data/:id', function(req, res){

    var id = req.params.id;

    var newContent = {
        Author: req.session.user.Username,
        Date: req.body.Date,
        Content: req.body.Content
    };

    //Put into Posts DB
    Posts.update({ _id: id }, { $set: { Content: req.body.Content }}, function(err){
        if(err) return res.send(err);
        res.json({
            Message: 'Successfully updated'
        });
    });

});

module.exports = router;