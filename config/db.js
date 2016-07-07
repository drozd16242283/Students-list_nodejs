var mongoose = require('mongoose');
var config   = require('./index');


// Connection to mongoDB with mongoose
var db = mongoose.connection;

mongoose.connect(config.get('db:dbAdress'));


db.on('error', console.error.bind(console, 'connection error'));
db.once('connect', function () {
    console.log('Success');
});



