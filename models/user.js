var mongoose = require('mongoose');
var db       = require('../config/db');
var bcrypt   = require('bcrypt-nodejs');


// Create User Schema
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Define user methods
userSchema.statics.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.statics.find = function(userName, cb) {
    this.findOne({username: userName}, cb);
};

userSchema.statics.findById = function(id, cb) {
    return this.findById({id: id}, cb);
};

userSchema.statics.newUser = function(userName, password, cb) {
    var instance = new this();
    instance.username = userName;
    instance.password = User.hashPassword(password);

    instance.save(cb);
};



User = mongoose.model('user', userSchema);

// Exports User model
exports.User = User;
