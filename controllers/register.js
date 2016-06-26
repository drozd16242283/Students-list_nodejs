var express = require('express');
var router = express.Router();
var model = require('../models');



router.get('/register', function(req, res){
    res.render('register', {
        title: 'Регистрация'
    });
});

router.post('/register', function(req, res){
    req.checkBody('name', 'Error: name is invalid').len(2, 15);
    req.checkBody('secName', 'Error: surname is invalid').len(2, 15);
    req.checkBody('email', 'Error: email is invalid').isEmail().len(4, 20);
    req.checkBody('group', 'Error: group is invalid').len(3, 15);
    req.checkBody('mark', 'Error: mark is invalid').isInt({min: 100, max: 300});

    var errors = req.validationErrors();
    if (errors) {

    } else {
        var data = {
            name: req.body.name,
            secoundName: req.body.secName,
            email: req.body.email,
            group: req.body.group,
            mark: req.body.mark
        };

        model.insertIntoDB(data, function(err){
            (err) ? console.error(err) : res.redirect('/');
        });
    }
});


module.exports = router;