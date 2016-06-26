var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('connect', function () {
    console.log('Success');
});

mongoose.connect('mongodb://localhost/students');


var studentSchema = new Schema({
    name: String,
    secoundName: String,
    email: String,
    group: String,
    mark: Number
});

module.exports = mongoose.model('Student', studentSchema);