var express   = require('express');
var router    = express.Router();
var cheekAuth = require('../middleware/cheekAuth');
var models    = require('../models/student');
// Define the Student model
var Student   = models.Student;


router.get('/info', /*cheekAuth,*/ function(req, res) {
    res.render('info', {
        layout: 'header',
        title: 'Информация о студенте'
    });
});

router.post('/info', function(req, res) {
    // Validation form
    req.checkBody('name', 'Error: name is invalid').len(2, 15);
    req.checkBody('secName', 'Error: surname is invalid').len(2, 15);
    req.checkBody('email', 'Error: email is invalid').isEmail().len(4, 50);
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
            mark: req.body.mark
        };

        Student.insertIntoDB(data, function(err) {
            (err) ? console.error(err) : res.redirect('/');
        });
    }
});

// 404 route
router.all('*', function(req, res) {
    res.send('404: Not Found');
});


module.exports = router;