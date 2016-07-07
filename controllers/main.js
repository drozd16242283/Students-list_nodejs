var express = require('express');
var router  = express.Router();
var models   = require('../models/student');
// Define the Student model
var Student = models.Student;

router.get('/', function (req, res) {
    var dataArr = [];

    Student.findAll(function(err, data) {
        if (err) throw err;

        for (var i in data) {
            dataArr.push(data[i]);
        }
    });
    console.log(req.user);
    res.render('index', {
        title: 'Поиск студентов',
        data: dataArr
    });
});

router.post('/', function(req, res) {
    var query = req.body.text;

    Student.findSearch(query, function (err, data) {
        if (data) {
            res.render('index', {
                name: data.name,
                secoundName: data.secoundName,
                email: data.email,
                group: data.group,
                mark: data.mark
            });
        } else {
            res.render('index', {
                error: 'Нет результатов по запросу : ' + query
            });
        }
    });
});



module.exports = router;