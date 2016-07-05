var mongoose   = require('mongoose');
var config   = require('../config');

var Schema = mongoose.Schema;
var db = mongoose.connection;

// connect to the MongoDB
mongoose.connect(config.get('db:dbAdress'));

db.on('error', console.error.bind(console, 'connection error'));
db.once('connect', function () {
    console.log('Success');
});


// Create Schema
var Student = new Schema({
    name: String,
    secoundName: String,
    email: String,
    group: String,
    mark: Number
});





module.exports = mongoose.model('Student', Student);