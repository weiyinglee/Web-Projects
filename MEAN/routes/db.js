var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
    Username: String,
    Password: String
});

var Posts = new Schema({
    Author: String,
    Date: Date,
    Content: String
});

mongoose.model('Users', Users);
mongoose.model('Posts', Posts);
mongoose.connect('mongodb://localhost/MEANDB');
