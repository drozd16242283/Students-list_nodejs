var mongoose = require('mongoose');
var Student  =  mongoose.model('student');

var genToken = require('../helpers/token').getToken();


exports.index = function(req, res) {
    res.render('info', {
        layout: 'header',
        title: 'Информация о студенте'
    });
};

exports.postInfo = function(req, res) {
    // Validation form
    req.checkBody('name', 'Error: name is invalid').len(2, 15);
    req.checkBody('secName', 'Error: surname is invalid').len(2, 15);
    req.checkBody('email', 'Error: surname is invalid').len(2, 30);
    req.checkBody('group', 'Error: group is invalid').len(3, 15);
    req.checkBody('mark', 'Error: mark is invalid').isInt({min: 100, max: 300});

    var errors = req.validationErrors();
    if (errors) {
        res.send(errors);
    } else {
        var data = {
            name: req.body.name,
            secoundName: req.body.secName,
            email: req.body.email,
            group: req.body.group,
            mark: req.body.mark,
            token: genToken
        };

        Student.insertIntoDB(data, function (err) {
            (err) ? console.error(err) : res.redirect('/');
        });
    }
};


