var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
    Email: String,
    Username: String,
    Password: String
});

var Posts = new Schema({
    Author: String,
    PostTitle: String,
    Message: String,
    Date: Date,
    Comment: Array
});

mongoose.model('Users', Users);
mongoose.model('Posts', Posts);
mongoose.connect('mongodb://localhost/SaleSiteDB');