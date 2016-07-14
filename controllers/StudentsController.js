var mongoose = require('mongoose');
var Student  =  mongoose.model('student');


exports.showStudent = function (req, res) {

    var StudentsArray = [];

    Student.findAll(function (err, data) {
        if (err) throw err;

        for (var i in data) {
            StudentsArray.push(data[i]);
        }
    });

    var IsLoginToken = (res.cookies.IsLogin) ? true : false;


    res.render('index', {
        title: 'Поиск студентов',
        data: StudentsArray,
        token: IsLoginToken
    });
};

exports.findStudent = function(req, res) {

    var query = req.body.text;
    var renderData = {};

    // find student by name or surname
    Student.findSearch(query, function (err, data) {
        if (data) {
            renderData = {
                name: data.name,
                secoundName: data.secoundName,
                email: data.email,
                group: data.group,
                mark: data.mark
            };
        } else {
            renderData = {
                error: 'Нет результатов по запросу : ' + query
            };
        }
    });

    res.render('index', renderData);
};

