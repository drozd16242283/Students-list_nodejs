var express = require('express');
var router = express.Router();
var model = require('../models');


router.get('/', function (req, res){
    var dataArr = [];

    model.findAll(function(err, data){
        if (err) throw err;

        for (var i in data){
            dataArr.push(data[i]);
        }
    });
    res.render('index', {
        title: 'Поиск студентов',
        data: dataArr
    });
});

router.post('/', function(req, res) {
    var query = req.body.text;

    model.findSearch(query, function (err, data) {
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