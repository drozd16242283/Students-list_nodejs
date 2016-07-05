var db = require('./student');

exports.findAll = function(cb) {
    db.find({}, cb);
};

exports.findSearch = function(searchQuery, cb){
    db.findOne({name: searchQuery}, cb);
};

exports.insertIntoDB = function(data, cb){
    var student = new db(data);

    student.save(cb);

};