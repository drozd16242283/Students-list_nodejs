var mongoose = require('mongoose');
var db       = require('../config/db');


// Create Student Schema
var studentSchema = new mongoose.Schema({
    name: String,
    secoundName: String,
    email: String,
    group: String,
    mark: Number
});


// Define some STATICS methods
studentSchema.statics.findAll = function(cb) {
    return this.find({}, cb);
};

studentSchema.statics.findSearch = function(searchData, cb) {
    return this.findOne({ $or : [ { name: searchData }, { secoundName: searchData } ] }, cb);
};

studentSchema.statics.insertIntoDB = function(data, cb) {
    // Create instance of Student (this)
    var newStudent = new this(data);

    newStudent.save(cb);
};


Student = mongoose.model('student', studentSchema);

// Exports Student model
exports.Student = Student;